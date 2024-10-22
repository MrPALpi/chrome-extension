chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (!(changeInfo.status === 'complete' && tab.url)) {
    return;
  }

  chrome.scripting.executeScript({ target: { tabId: tabId }, func: getTabData }, (results) => {

    console.log(!(results && results[0] && results[0].result));

    if (!(results && results[0] && results[0].result)) {
      return;
    }

    const tabData = results[0].result;
    // const tabUrl = tab.url;
    console.log('test');
    // Сохраняем контент страницы с ключом-URL
    chrome.storage.local.get('pages', function (data) {
      console.log('test2', data.pages, tabData.url);
      const pages = data.pages || {};

      console.log('test2', pages[tabData.url])

      if (pages[tabData.url] !== undefined) {
        return;
      }

      pages[tabData.url] = tabData;

      chrome.storage.local.set({ pages: pages }, function () {
        console.log(`Контент для URL ${tabData.url} сохранен.`);
      });
    });
  });
});

const getTabData = async () => {
  const tabData = await new Promise((resolve) => {

    const tabDataCallBack = () => {
      return {
        url: location.href,
        date: new Date().getTime(),
        content: document.body.innerText || document.body.textContent
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

