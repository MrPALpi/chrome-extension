import { getTabData } from "./getTabData";
import { createHash } from "./createHash";
import { getToken } from "./getToken";
import {cleanText} from "./cleanText";

export default () => {

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log('test');

    if (tab.url.startsWith("chrome://")) {
      return;
    }

    if (!(changeInfo.status === 'complete' && tab.url)) {
      return;
    }

    chrome.scripting.executeScript({ target: { tabId: tabId }, func: getTabData }, async (results) => {
      console.log(results && results[0] && results[0].result);      
      if (!(results && results[0] && results[0].result)) {
        return;
      }

      const tabData = cleanText(results[0].result.content);

      const id = await createHash(tabData.url + tabData.content);


      chrome.storage.local.get(id, async (data) => {
        if (Object.keys(data).length !== 0) {
          return
        }

        const token = await getToken();

        chrome.storage.local.set({ [id]: tabData }).then(() => {
          fetch('https://hound.sosus.org/stories/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': token
            },
            body: JSON.stringify(tabData)
          })
        });
      });
    });
  });

}