export default function cutEndSpacesFromText(text: string) {
  return text.trim().replace(/[\s]+\n/g, '\n');
}
