export default function cutHashtagsFromText(text: string) {
  let resultText = text;
  // const hashtagsIsMixedWithText = /([^\dА-яёЁ\w#][^\s#]+).*(#[^#\s\.,]+).*([^\dА-яёЁ\w#]+)/.test(
  const hashtagsIsMixedWithText = /(([\s-\.,]|\b)[^\s#]+).*(#[^\s#]+).*(([^\dА-яёЁ\w#][^\s#]+)|([^\dА-яёЁ\w#\s]))/.test(
    text
  );

  if (hashtagsIsMixedWithText) {
    // последние хэштеги вырезаем
    resultText = resultText.replace(/([^\dА-яёЁ\w]*(#[^\s#\.,-]+[^\dА-яёЁ\w\.,-]*)+)$/g, '');

    // хэштеги, написанные в слитную с предыдущим словом заменяем пробелом
    resultText = resultText.replace(/([^\s])#/g, '$1 ');

    // убираем знаки хэштега у всех слов до последних хэштегов
    resultText = resultText.replace(/#/g, '');
  } else {
    resultText = resultText.replace(/[^\dА-яёЁ\w#\.,-]*#[^\s#\.,-]+[^\dА-яёЁ\w#\.,-]*/g, '');
  }

  return resultText;
}
