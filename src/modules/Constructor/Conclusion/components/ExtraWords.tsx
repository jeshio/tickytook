import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UBlockLimitedHeight from 'src/ui-components/UBlockLimitedHeight';
import UHashtag from 'src/ui-components/UHashtag';
import UInlineBlock from 'src/ui-components/UInlineBlock';
import styled from 'styled-components';
import Block from './Block';

interface IExtraWordsProps {
  extraWords: string[];
  extraHashtags: string[];
  loading: boolean;
  onExtraWordClick: (extraWord: string) => any;
}

const HashtagBlock = styled(UInlineBlock)`
  transition: all 1s, margin-right 2s;
`;

const StyledUBlockLimitedHeight = styled(UBlockLimitedHeight)`
  overflow-x: hidden;
`;

class ExtraWords extends React.PureComponent<IExtraWordsProps, any> {
  public render() {
    const { extraWords, loading, extraHashtags } = this.props;
    const actualExtraHashtags = extraWords.filter(w => extraHashtags.indexOf(w) < 0);
    return (
      <Block loading={loading} title="Наколдованные хэштеги" stepNumber={2}>
        <UBlock visible={actualExtraHashtags.length > 0} px={2} paddingBottom={2}>
          Кликай на слова, чтобы закинуть их в котёл хэштегов:
        </UBlock>
        <StyledUBlockLimitedHeight maxHeight={['250px', '250px', '250px', '500px']}>
          {extraWords.map((w, i) => {
            const isVisible = extraHashtags.indexOf(w) < 0;
            return (
              <UInlineBlock key={w}>
                <HashtagBlock
                  key={w}
                  marginTop={0}
                  marginBottom="1px"
                  marginRight="1px"
                  css={`
                    opacity: ${isVisible ? 1 : 0};
                    margin-left: ${isVisible ? '0' : '-50px'};
                    margin-right: ${isVisible ? '1px' : '-250px'};
                    width: ${isVisible ? '100%' : '0'};
                    pointer-events: ${isVisible ? 'all' : 'none'};
                  `}
                >
                  <UHashtag onClick={this.onWordClick(w)}>{w}</UHashtag>
                </HashtagBlock>
              </UInlineBlock>
            );
          })}
        </StyledUBlockLimitedHeight>
        {actualExtraHashtags.length === 0 && (
          <UBlock py="3rem" px={['1.5rem', '5rem']} textAlign="center">
            Напиши хэштеги или текст вверху, чтобы можно было наколдовать новые хэштеги
          </UBlock>
        )}
      </Block>
    );
  }

  private onWordClick = (hashtag: string) => () => {
    this.props.onExtraWordClick(hashtag);
  };
}

export default ExtraWords;
