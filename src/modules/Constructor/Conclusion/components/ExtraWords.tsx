import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UHashtag from 'src/ui-components/UHashtag';

interface IExtraWordsProps {
  extraWords: string[];
  extraHashtags: string[];
  loading: boolean;
  onExtraWordClick: (extraWord: string) => any;
}

class ExtraWords extends React.PureComponent<IExtraWordsProps, any> {
  public render() {
    const { extraWords, loading, extraHashtags } = this.props;
    const extraHashtagsSet = new Set(extraHashtags);
    return (
      <UBlock>
        <h2>Наколдованные хэштеги</h2>
        <UBlock visible={extraWords.length > 0}>
          Кликай на слова, чтобы добавить их в котёл хэштегов:
        </UBlock>
        {extraWords
          .filter(w => !extraHashtagsSet.has(w))
          .map((w, i) => (
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
        {extraWords.length === 0 && (
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
