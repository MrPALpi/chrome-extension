import { getTabData } from "./getTabData";
import { createHash } from "./createHash";
import { getToken } from "./token";
import { cleanText } from "./cleanText";

export const newTab = () => {

  chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (tab.url.startsWith("chrome://")) {
      return;
    }

    if (!(changeInfo.status === 'complete' && tab.url)) {
      return;
    }

    const token = await getToken();

    if (token === null) {
      return;
    }

    chrome.scripting.executeScript({ target: { tabId }, func: getTabData }, async (results) => {
      if (!(results && results[0] && results[0].result)) {
        return;
      }

      try {
        const tabData = results[0].result;
        tabData.content = await cleanText(tabData.content);
        const id = await createHash(`${tabData.url}_${tabData.content}`);
 
        chrome.storage.local.get(id, async (data) => {
          if (Object.keys(data).length !== 0) {
            return
          }

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
      } catch (error) {
        console.log(error);
      }
    });
  });
}