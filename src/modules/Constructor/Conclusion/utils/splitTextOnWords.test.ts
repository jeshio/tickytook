import splitTextOnWords from './splitTextOnWords';

describe('splitTextOnWords', () => {
  describe('empty text', () => {
    it('should be empty array', () => {
      expect(splitTextOnWords('')).toEqual([]);
    });
  });

  describe.each([
    ['Это simple предложение из слов', ['Это', 'simple', 'предложение', 'из', 'слов']],
    ['Предложение, что немного сложнее.', ['Предложение', 'что', 'немного', 'сложнее']],
  ])('sentences', (sentence, expected) => {
    it('should be split on words', () => {
      expect(splitTextOnWords(sentence as string)).toEqual(expected);
    });
  });

  describe('text', () => {
    const text = `Это простое предложение из слов.
    Sentence, that немного сложнее того, другого!`;
    it('should be split on words', () => {
      expect(splitTextOnWords(text)).toHaveLength(11);
    });
  });
});
