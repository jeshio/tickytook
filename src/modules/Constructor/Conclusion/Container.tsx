import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import copyTextToClipboard from 'src/core/utils/copyTextToClipboard';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import Presentation, { IPresentationProps } from './Presentation';

type PropsType = ParamsReceiverStore.ISelectors & Store.ISelectors & Store.IActions;

class Container extends Component<PropsType> {
  public render() {
    return createElement<IPresentationProps>(Presentation, {
      ...this.props,
      onCopyHashtags: this.handleCopyHashtags,
    });
  }

  private handleCopyHashtags = () => {
    const { activeHashtags } = this.props;
    const textToCopy = activeHashtags.join(' ');
    copyTextToClipboard(textToCopy);
  };
}

export default connect<
  ParamsReceiverStore.ISelectors & Store.ISelectors,
  Store.IActions,
  void,
  ParamsReceiverStore.IStore & Store.IStore
>(
  state => Object.assign(ParamsReceiverStore.selectors(state), Store.selectors(state)),
  (dispatch: Dispatch) =>
    bindActionCreators(Store.actions as ICStringIndexes, dispatch) as Store.IActions
)(Container);
