chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (!(changeInfo.status === 'complete' && tab.url)) {
    return;
  }

  chrome.scripting.executeScript({ target: { tabId: tabId }, func: getTabData }, async (results) => {

    if (!(results && results[0] && results[0].result)) {
      return;
    }
    
    const tabData = results[0].result;
    
    const id = await createHash(tabData.url + tabData.content);


    chrome.storage.local.get(id, function  (data) {
      console.log(id, data)
      if (Object.keys(data).length !== 0) {
        return
      }

      chrome.storage.local.set({ [id]: tabData }).then(() => {
        console.log('set')
        fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': ''
          },
          body: JSON.stringify(tabData)
        })
      });
    });
  });
});


const createHash = async (text) => {
  
  return await new Promise((resolve) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      hash += charCode * (i + 1);
    }

    resolve(hash.toString());
  })
}

const getTabData = async () => {
  const tabData = await new Promise((resolve) => {

    const tabDataCallBack = () => {
      return {
        url: location.href,
        title:  document.title,
        content: document.body.innerText || document.body.textContent,
        viewed_at: new Date().toISOString().slice(0, 19)
      }
    }

    if (document.readyState === 'complete') {
      resolve(tabDataCallBack());
    } else {
      window.addEventListener('load', () => {
        resolve(tabDataCallBack());
      });
    }
  });

  return tabData
}

