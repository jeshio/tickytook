import uniq from 'lodash/uniq';
import { WATERMARK_HASHTAG } from '../constants';

export default function getHashtagsFromWords(
  words: string[],
  deleteDuplicates: boolean,
  deleteNumberWords: boolean,
  sortByAlphabet: boolean,
  minimumHashtagLength: number,
  withWaterMark = true
) {
  let result = [...words].filter(s => s.length >= minimumHashtagLength);

  if (deleteDuplicates) {
    result = uniq(result);
  }

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

  if (withWaterMark && result.length > 5) {
    result.splice(Math.random() * words.length - 1, 0, WATERMARK_HASHTAG);
  }

  return result.map(w => `#${w}`);
}
