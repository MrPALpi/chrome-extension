export const getTabData = async () => {
  return await new Promise((resolve) => {

    if (location.href === 'chrome://new-tab-page/') {
      return false
    }

    const tabDataCallBack = () => {
      return {
        url: location.href,
        title: document.title,
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
}