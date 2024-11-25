let token = null;

const readToken = async () => {
  return await chrome.storage.sync.get(['isAuthenticated'])
}

export const getToken = async () => {
  if (token === null) {
    const result = await readToken();
    token = result['isAuthenticated'] ? result['token'] : null;
  }

  return token
}