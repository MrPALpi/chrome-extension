let token = null;

const getToken = async () => {
  console.log('test')
  return await chrome.storage.local.get('token')
}

export default async () => {
  if (token === null) {
    token = await getToken();
  }

  return token['token']
}