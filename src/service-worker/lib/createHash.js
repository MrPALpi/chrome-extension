export const createHash = async (text) => {

  return await new Promise((resolve) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      hash += charCode * (i + 1);
    }

    resolve(hash.toString());
  })
}