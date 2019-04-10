import * as React from 'react';
import UTextarea from 'src/ui-components/UTextarea';
import getHashtagsFromWords from '../utils/getHashtagsFromWords';
import hashtagsToText from '../utils/hashtagsToText';

interface IHashtagsTextProps {
  words: string[];
  convertToLower: boolean;
  deleteDuplicates: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
}

const HashtagsText: React.FunctionComponent<IHashtagsTextProps> = props => {
  const {
    convertToLower,
    deleteDuplicates,
    deleteNumberWords,
    sortByAlphabet,
    minimumHashtagLength,
  } = props;
  const hashTags = getHashtagsFromWords(
    props.words,
    deleteDuplicates,
    deleteNumberWords,
    sortByAlphabet,
    minimumHashtagLength
  );
  const value = hashtagsToText(hashTags, convertToLower);

  return (
    <React.Fragment>
      <UTextarea
        placeholder="Здесь будут обработанные хэштеги"
        rows={6}
        readOnly={true}
        value={value}
      />
      <span>Количество хэштегов: {hashTags.length}</span>
    </React.Fragment>
  );
};

export default HashtagsText;
