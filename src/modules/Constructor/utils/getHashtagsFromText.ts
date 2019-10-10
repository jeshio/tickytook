export default function getHashtagsFromText(text: string) {
  return text
    .split(/[^#\dА-яёЁ\w]+/)
    .filter(w => w.includes('#'))
    .join(' ')
    .split(/(?:[\s]?[^#]*)*#([^\s#-\.,]+)(?:[-\.,].*)*/)
    .filter(w => w.length > 0);
}
