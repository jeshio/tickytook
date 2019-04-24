import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UHashtag from 'src/ui-components/UHashtag';

interface IHashtagsTextProps {
  hashtags: string[];
  activeHashtags: string[];
  inactiveHashtags: Set<string>;
  onCopyHashtags: () => void;
  switchHashtagActiveStatus: (hashtag: string) => void;
}

interface IHashtagsTextState {
  showSuccessCopyMessage: boolean;
}

class HashtagsText extends React.PureComponent<IHashtagsTextProps, IHashtagsTextState> {
  public state = {
    showSuccessCopyMessage: false,
  };
  private copyMsgTimeout: any = null;

  public render() {
    const { hashtags, inactiveHashtags, activeHashtags } = this.props;
    const { showSuccessCopyMessage } = this.state;

    return (
      <UBlock>
        <h2>Котёл хэштегов</h2>

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
        </UBlock>

        <UBlock
          py="3rem"
          px={['1.5rem', '5rem']}
          textAlign="center"
          visible={hashtags.length === 0}
        >
          Котёл пока ещё пуст.
        </UBlock>

        <UBlock marginTop={0}>Количество хэштегов в котле: {activeHashtags.length}</UBlock>

        <UBlock textAlign="center" visible={hashtags.length > 0}>
          <UButton onClick={this.handleCopyClick} appearance="primary">
            {showSuccessCopyMessage ? 'скопировано!' : 'копировать из котла'}
          </UButton>
        </UBlock>
      </UBlock>
    );
  }

  private handleHashtagClick = (hashtag: string) => () =>
    this.props.switchHashtagActiveStatus(hashtag);

  private handleCopyClick = () => {
    this.props.onCopyHashtags();
    clearTimeout(this.copyMsgTimeout);
    this.setState(
      {
        showSuccessCopyMessage: true,
      },
      () => {
        this.copyMsgTimeout = setTimeout(
          () => this.setState({ showSuccessCopyMessage: false }),
          1200
        );
      }
    );
  };
}

export default HashtagsText;
