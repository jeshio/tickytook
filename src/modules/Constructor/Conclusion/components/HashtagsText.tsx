import * as React from 'react';
import UButton from 'src/ui-components/UButton';
import UHashTag from 'src/ui-components/UHashTag';

interface IHashtagsTextProps {
  hashTags: string[];
  onCopyHashTags: () => void;
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
    const { hashTags } = this.props;
    const { showSuccessCopyMessage } = this.state;

    return (
      <React.Fragment>
        <div>
          {hashTags.map((h, i) => (
            <UHashTag key={i}>{h}</UHashTag>
          ))}
        </div>
        <UButton onClick={this.handleCopyClick}>
          {showSuccessCopyMessage ? 'скопировано!' : 'копировать'}
        </UButton>
        <div>Количество хэштегов: {hashTags.length}</div>
      </React.Fragment>
    );
  }

  private handleCopyClick = () => {
    this.props.onCopyHashTags();
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
