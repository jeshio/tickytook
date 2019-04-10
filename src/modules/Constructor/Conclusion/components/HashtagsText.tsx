import * as React from 'react';
import UTextarea from 'src/ui-components/UTextarea';
import getHashtagsFromWords from '../utils/getHashtagsFromWords';
import hashtagsToText from '../utils/hashtagsToText';

interface IHashtagsTextProps {
  words: string[];
}

const HashtagsText: React.FunctionComponent<IHashtagsTextProps> = props => {
  const hashTags = getHashtagsFromWords(props.words);
  const value = hashtagsToText(hashTags);

  return (
    <UTextarea
      placeholder="Здесь будут обработанные хэштеги"
      rows={6}
      readOnly={true}
      value={value}
    />
  );
};

export default HashtagsText;
