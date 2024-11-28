let token = null;

const readToken = async () => {
  return await chrome.storage.sync.get(['token', 'isAuthenticated']);
}

const setToken = async (token) => {
  return await chrome.storage.sync.set({ isAuthenticated: token !== null, token: token });
}

const isAuthenticated = async () => {
  if (token !== null) {
    return true;
  }

  const result = await readToken();
  return result['isAuthenticated']
}



const getToken = async () => {
  if (token === null) {
    const result = await readToken();
    token = result['isAuthenticated'] ? result['token'] : null;
  }

  return token
}

export { getToken, isAuthenticated, setToken }