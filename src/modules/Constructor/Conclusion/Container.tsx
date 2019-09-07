import { IActions, IProps, ISelectors } from 'modules/Constructor/Conclusion';
import { Component, createElement } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import connect from 'src/core/hocs/connect';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import copyTextToClipboard from 'src/core/utils/copyTextToClipboard';
import { Store } from '..';
import Presentation from './Presentation';

type PropsType = { shortModeLeftColumn: React.ReactElement } & IProps;

class Container extends Component<PropsType> {
  public render() {
    return createElement(Presentation, {
      ...this.props,
      onCopyHashtags: this.handleCopyHashtags,
      onCopyPost: this.handleCopyPost,
    });
  }

  private handleCopyHashtags = () => {
    const {
      selectors: { activeHashtags },
    } = this.props;
    const textToCopy = activeHashtags.join(' ');
    copyTextToClipboard(textToCopy);
  };

  private handleCopyPost = () => {
    const {
      selectors: { activeHashtags, text },
    } = this.props;
    const hashtagsToCopy = activeHashtags.join(' ');
    const postToCopy = `${text}\n\n${hashtagsToCopy}`;
    copyTextToClipboard(postToCopy);
  };
}

export default connect<ISelectors, IActions>(
  state => Store.selectors(state),
  (dispatch: Dispatch) => bindActionCreators(Store.actions as ICStringIndexes, dispatch) as IActions
)(Container);
