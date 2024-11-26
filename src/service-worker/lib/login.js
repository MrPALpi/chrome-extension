import { isAuthenticated, setToken } from './token';

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

    if (res.status === 200 && body.token) {
      await setToken(body.token);
      return ['showAuthenticatedUI', true];
    } 
    
    return ['showAuthenticatedUI', false];
    
  },
   check: async () => {
    const isAuth = await isAuthenticated();
    return ['showAuthenticatedUI', isAuth];
  }
};

export const login = () => {

  const channel = new BroadcastChannel('login');

  channel.onmessage = async (messageEvent) => {
  const {action, form} = messageEvent.data;

  if (action in channelEvents === false) {
    return
  }

  const [resultAction, resultData] = await channelEvents[action](form);
  channel.postMessage({action: resultAction, result: resultData});
};
}
