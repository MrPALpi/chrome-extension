export const createHash = async (text) => {

  return await new Promise((resolve) => {
    let hash = 0;
    const maxHash = Math.pow(2, 32);
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      hash = (hash * 31 + charCode) % maxHash;
    }

    resolve(hash.toString(16));
  })
}