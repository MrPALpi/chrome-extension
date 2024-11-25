import { getToken } from './getToken';

const channelEvents = {
  login: async (data) => {
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
      chrome.storage.sync.set({ isAuthenticated: true, token: body.token });
      chrome.runtime.sendMessage({ action: 'showAuthenticatedUI' });
    }
  },
   check: async () => {
    const token = await getToken();

    if (token !== null) {
      chrome.runtime.sendMessage({ action: 'showAuthenticatedUI' });
      return;
    }

    chrome.runtime.sendMessage({ action: 'notShowAuthenticatedUI' });
  }
};

export default () => {
  const channel = new BroadcastChannel('login');

  channel.onmessage = async (event) => {
    const data = event.data;
    channelEvents[data.action](data);
  };

  // Функция для проверки авторизации при запуске браузера
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['isAuthenticated'], (result) => {
      if (result.isAuthenticated) {
        console.log('Пользователь уже авторизован');
        // Здесь вы можете обновить UI в popup.js
        chrome.runtime.sendMessage({ action: 'showAuthenticatedUI' });
      }
    });
  });
}
