export default function hashtagsToText(hashtags: string[], convertToLower: boolean) {
  const result = hashtags.join(' ');
  return convertToLower ? result.toLowerCase() : result;
}
