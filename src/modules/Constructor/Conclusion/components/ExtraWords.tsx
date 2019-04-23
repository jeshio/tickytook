import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UHashtag from 'src/ui-components/UHashtag';

interface IExtraWordsProps {
  extraWords: string[];
  loading: boolean;
}

const ExtraWords: React.FunctionComponent<IExtraWordsProps> = ({ extraWords, loading }) => {
  return (
    <UBlock>
      {extraWords.map((w, i) => (
        <UHashtag key={i}>#{w}</UHashtag>
      ))}
    </UBlock>
  );
};

export default ExtraWords;
