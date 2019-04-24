import * as React from 'react';
import setValueByArrayIndex from 'src/core/utils/setValueByArrayIndex';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UHashtag from 'src/ui-components/UHashtag';
import USubTitle from 'src/ui-components/USubTitle';

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
      <UBlock>
        <USubTitle>
          Котёл хэштегов
          <UBlock visible={hashtags.length > 0} display="inline">
            <UButton onClick={this.handleCopyClick(0)} appearance="link" px={0} paddingLeft={1}>
              {showSuccessCopyMessage[0] ? 'скопировано!' : 'копировать из котла'}
            </UButton>
          </UBlock>
        </USubTitle>

        <UBlock my={0} visible={hashtags.length > 0}>
          <UBlock>Кликай, чтобы убрать (или добавить) из котла:</UBlock>
          <UBlock marginBottom={0}>
            {hashtags.map((h, i) => (
              <UHashtag
                key={i}
                isDeleted={inactiveHashtags.has(h)}
                onClick={this.handleHashtagClick(h)}
              >
                {h}
              </UHashtag>
            ))}
          </UBlock>

          <UBlock marginTop={0}>Количество хэштегов в котле: {activeHashtags.length}</UBlock>

          <UBlock textAlign="center" visible={hashtags.length > 0}>
            <UButton onClick={this.handleCopyClick(1)} appearance="primary">
              {showSuccessCopyMessage[1] ? 'скопировано!' : 'копировать из котла'}
            </UButton>
          </UBlock>
        </UBlock>

        <UBlock
          py="3rem"
          px={['1.5rem', '5rem']}
          textAlign="center"
          visible={hashtags.length === 0}
        >
          Котёл пока ещё пуст.
        </UBlock>
      </UBlock>
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
