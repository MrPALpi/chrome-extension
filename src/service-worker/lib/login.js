export default () => {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'login') {
      const data = request.data;

      const res = await fetch('https://hound.sosus.org/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })

      const body = await res.json();
      console.log(res.status === 200 && body.token)
      if (res.status === 200 && body.token) {
        sendResponse({ success: true, result: true });
        chrome.storage.local.set({ 'token': body.token })
      } else {
        sendResponse({ success: false, result: false });
      }
    }
  });
}