/**
 * Дополняет двойные и более переносы строк символом невидимого пробела
 * @param text
 */
export default function addInvisibleSpacesToLineBreaks(text: string) {
  return text.replace(/(?<=[\n\r][\s^\n\r]*)([\n\r])/gm, `⠀$1`);
}
