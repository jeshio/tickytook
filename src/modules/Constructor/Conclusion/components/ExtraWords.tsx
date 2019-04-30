import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UBlockLimitedHeight from 'src/ui-components/UBlockLimitedHeight';
import UHashtag from 'src/ui-components/UHashtag';
import USubTitle from 'src/ui-components/USubTitle';

interface IExtraWordsProps {
  extraWords: string[];
  extraHashtags: string[];
  loading: boolean;
  onExtraWordClick: (extraWord: string) => any;
}

class ExtraWords extends React.PureComponent<IExtraWordsProps, any> {
  public render() {
    const { extraWords, loading, extraHashtags } = this.props;
    const actualExtraHashtags = extraWords.filter(w => extraHashtags.indexOf(w) < 0);
    return (
      <UBlock>
        <USubTitle loading={loading}>Наколдованные хэштеги</USubTitle>
        <UBlock visible={actualExtraHashtags.length > 0}>
          Кликай на слова, чтобы закинуть их в котёл хэштегов:
        </UBlock>
        <UBlockLimitedHeight maxHeight={['250px', '250px', '250px', '500px']}>
          {actualExtraHashtags.map((w, i) => (
            <UBlock
              display="inline-block"
              key={i}
              marginTop={0}
              marginBottom="1px"
              marginRight="1px"
            >
              <UHashtag onClick={this.onWordClick(w)}>{w}</UHashtag>
            </UBlock>
          ))}
        </UBlockLimitedHeight>
        {actualExtraHashtags.length === 0 && (
          <UBlock py="3rem" px={['1.5rem', '5rem']} textAlign="center">
            Напиши хэштеги или текст вверху, чтобы можно было наколдовать новые хэштеги
          </UBlock>
        )}
      </UBlock>
    );
  }

  private onWordClick = (hashtag: string) => () => {
    this.props.onExtraWordClick(hashtag);
  };
}

export default ExtraWords;
