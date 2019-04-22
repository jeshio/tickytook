import uniq from 'lodash/uniq';
import { WATERMARK_HASHTAG } from '../constants';

export default function getHashtagsFromWords(
  {
    words = [],
    deleteNumberWords = false,
    sortByAlphabet = false,
    convertToLower = false,
    minimumHashtagLength = 0,
  }: {
    words: string[];
    deleteNumberWords: boolean;
    sortByAlphabet: boolean;
    convertToLower: boolean;
    minimumHashtagLength: number;
  },
  withWaterMark = true
) {
  let result = [...words].filter(s => s.length >= minimumHashtagLength);

  if (deleteNumberWords) {
    result = result.filter(s => s.match(/[^\d]+/));
  }

  if (sortByAlphabet) {
    result = result.sort((a, b) => {
      const aA = a.toLowerCase();
      const bB = b.toLowerCase();
      return aA < bB ? -1 : aA > bB ? 1 : 0;
    });
  }

  if (withWaterMark && result.length > 9) {
    result.splice(Math.random() * words.length - 1, 0, WATERMARK_HASHTAG);
  }

  if (convertToLower) {
    result = result.map(w => w.toLowerCase());
  }

  result = uniq(result);

  return result.map(w => `#${w}`);
}
