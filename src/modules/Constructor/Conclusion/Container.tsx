import isEqual from 'lodash/isEqual';
import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import StringIndexes from 'src/core/interfaces/StringIndexes';
import copyTextToClipboard from 'src/core/utils/copyTextToClipboard';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import Presentation, { IPresentationProps } from './Presentation';
import splitTextOnWords from './utils/splitTextOnWords';

type PropsType = ParamsReceiverStore.ISelectors & Store.ISelectors & Store.IActions;

class Container extends Component<PropsType> {
  public componentDidMount() {
    this.updateWords();
  }

  public componentDidUpdate(prevProps: PropsType) {
    this.updateWords(prevProps);
  }

  public render() {
    return createElement<IPresentationProps>(Presentation, {
      ...this.props,
      onCopyHashTags: this.handleCopyHashTags,
    });
  }

  private updateWords = (prevProps: PropsType = {} as PropsType) => {
    if (prevProps.text !== this.props.text) {
      const words = splitTextOnWords(this.props.text);

      if (!isEqual(words, prevProps.words)) {
        this.props.changeWords(words);
      }
    }
  };

  private handleCopyHashTags = () => {
    const { hashTags } = this.props;
    const textToCopy = hashTags.join(' ');
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
    bindActionCreators(Store.actions as StringIndexes, dispatch) as Store.IActions
)(Container);
