import * as React from 'react';
import setValueByArrayIndex from 'src/core/utils/setValueByArrayIndex';
import UBlock from 'src/ui-components/UBlock';
import UBlockLimitedHeight from 'src/ui-components/UBlockLimitedHeight';
import UButton from 'src/ui-components/UButton';
import UHashtag from 'src/ui-components/UHashtag';
import styled from 'styled-components';
import Block from './Block';

interface IHashtagsTextProps {
  hashtags: string[];
  activeHashtags: string[];
  inactiveHashtags: Set<string>;
  onCopyHashtags: () => void;
  switchHashtagActiveStatus: (hashtag: string) => void;
}

interface IHashtagsTextState {
  showSuccessCopyMessage: boolean[];
}

class HashtagsText extends React.PureComponent<IHashtagsTextProps, IHashtagsTextState> {
  public state = {
    showSuccessCopyMessage: [false, false],
  };
  private copyMsgTimeouts: any = [];

  public render() {
    const { hashtags, inactiveHashtags, activeHashtags } = this.props;
    const { showSuccessCopyMessage } = this.state;

    return (
      <Block title="Котёл хэштегов" stepNumber={3}>
        <UBlock my={0} visible={hashtags.length > 0}>
          <UBlock px={2} paddingBottom={2}>
            Кликните, чтобы убрать (или добавить) из котла:
          </UBlock>
          <UBlockLimitedHeight maxHeight={['250px', '250px', '250px', '350px']}>
            {hashtags.map((h, i) => (
              <UHashtag
                key={i}
                isDeleted={inactiveHashtags.has(h)}
                onClick={this.handleHashtagClick(h)}
              >
                {h}
              </UHashtag>
            ))}
          </UBlockLimitedHeight>

          <UBlock py={2} px={2}>
            Количество хэштегов в котле: {activeHashtags.length}
          </UBlock>

          <UBlock textAlign="center" visible={hashtags.length > 0} paddingTop={2}>
            <UButton
              onClick={this.handleCopyClick(1)}
              appearance="primary"
              extraText="только хэштеги"
            >
              {showSuccessCopyMessage[1] ? 'Готово!' : 'Копировать из котла'}
            </UButton>
          </UBlock>
        </UBlock>

        <UBlock
          py="3rem"
          px={['1.5rem', '5rem']}
          textAlign="center"
          visible={hashtags.length === 0}
        >
          Котёл пока ещё пуст. Добавьте наколдованные хэштеги.
        </UBlock>
      </Block>
    );
  }

  private handleHashtagClick = (hashtag: string) => () =>
    this.props.switchHashtagActiveStatus(hashtag);

  private handleCopyClick = (index: number) => () => {
    this.props.onCopyHashtags();
    clearTimeout(this.copyMsgTimeouts[index]);
    this.setState(
      ({ showSuccessCopyMessage }) => ({
        showSuccessCopyMessage: setValueByArrayIndex(showSuccessCopyMessage, index, true),
      }),
      () => {
        this.copyMsgTimeouts[index] = setTimeout(
          () =>
            this.setState(({ showSuccessCopyMessage }) => ({
              showSuccessCopyMessage: setValueByArrayIndex(showSuccessCopyMessage, index, false),
            })),
          1200
        );
      }
    );
  };
}

export default HashtagsText;
