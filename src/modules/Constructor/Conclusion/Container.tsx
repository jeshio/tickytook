import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import copyTextToClipboard from 'src/core/utils/copyTextToClipboard';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import { Actions, Selectors } from './module';
import Presentation, { IPresentationProps } from './Presentation';

type PropsType = { shortModeLeftColumn: React.ReactElement } & Selectors & Actions;

class Container extends Component<PropsType> {
  public render() {
    return createElement<IPresentationProps>(Presentation, {
      ...this.props,
      onCopyHashtags: this.handleCopyHashtags,
      onCopyPost: this.handleCopyPost,
      isExtendedMode: this.props.paramsReceiver.isExtendedMode,
      switchMode: this.props.paramsReceiverActions.switchMode,
    });
  }

  private handleCopyHashtags = () => {
    const { activeHashtags } = this.props;
    const textToCopy = activeHashtags.join(' ');
    copyTextToClipboard(textToCopy);
  };

  private handleCopyPost = () => {
    const {
      activeHashtags,
      paramsReceiver: { text },
    } = this.props;
    const hashtagsToCopy = activeHashtags.join(' ');
    const postToCopy = `${text}\n\n${hashtagsToCopy}`;
    copyTextToClipboard(postToCopy);
  };
}

export default connect<Selectors, Actions, void, ParamsReceiverStore.IStore & Store.IStore>(
  state => ({ paramsReceiver: ParamsReceiverStore.selectors(state), ...Store.selectors(state) }),
  (dispatch: Dispatch) =>
    ({
      ...bindActionCreators(Store.actions as ICStringIndexes, dispatch),
      paramsReceiverActions: bindActionCreators(
        ParamsReceiverStore.actions as ICStringIndexes,
        dispatch
      ),
    } as Actions)
)(Container);
