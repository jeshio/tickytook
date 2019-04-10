import { WATERMARK_HASHTAG } from '../constants';

export default function getHashtagsFromWords(words: string[], withWaterMark = true) {
  const result = words;

  if (withWaterMark) {
    result.splice(Math.random() * words.length - 1, 0, WATERMARK_HASHTAG);
  }

  return result.map(w => `#${w}`);
}
