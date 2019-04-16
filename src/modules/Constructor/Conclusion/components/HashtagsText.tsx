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
      <React.Fragment>
        <UBlock>Кликай на хэштеги, чтобы убрать/добавить их в результат:</UBlock>
        <UBlock>
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
        <UButton onClick={this.handleCopyClick}>
          {showSuccessCopyMessage ? 'скопировано!' : 'копировать'}
        </UButton>
        <UBlock>Количество активных хэштегов: {activeHashtags.length}</UBlock>
      </React.Fragment>
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
