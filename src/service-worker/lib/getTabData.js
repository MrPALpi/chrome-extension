export const getTabData = async () => {
  return await new Promise((resolve) => {

    if (location.href === 'chrome://new-tab-page/') {
      return false
    }

    const tabDataCallBack = async () => {
      const bodyClone = document.body.cloneNode(true);
      bodyClone.querySelectorAll('header, nav, footer, style, script, noscript, jdiv').forEach(elm => elm.remove());
      const text = bodyClone.innerText || bodyClone.textContent || '';

      return {
        url: location.href,
        title: document.title,
        content: text,
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