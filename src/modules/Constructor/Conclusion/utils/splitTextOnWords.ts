export default function splitTextOnWords(text: string) {
  return text.split(/[^\dА-я\w]+/).filter(v => v.length > 0);
}
