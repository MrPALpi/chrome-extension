export const cleanText = async (text) => {
  return await new Promise((resolve, reject) => {
    if (typeof text !== 'string') {
      reject(new Error('Text must be a string'));
      return;
    } else {
      text = text
      .replace(/\.+/g, '') // Remove long sequences of dots
      .replace(/[\n\r]+/g, '\n') // Normalize line breaks
      .replace(/\s+/g, ' ') // Collapse multiple spaces into one
      .trim(); // Trim whitespace at start and end

      // Remove unwanted phrases
      const unwantedPhrases = [
          'Скрыть', 'Политика конфиденциальности', 'Обратная связь', '©', 'Подробнее'
      ];
      unwantedPhrases.forEach(phrase => {
          const regex = new RegExp(phrase, 'gi');
          text = text.replace(regex, '');
      });
      resolve(text);
    }
  })
}
