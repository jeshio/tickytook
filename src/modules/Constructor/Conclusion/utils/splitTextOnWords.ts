export default function splitTextOnWords(text: string) {
  return text.split(/[^\dА-яёЁ\w]+/).filter(v => v.length > 0);
}
