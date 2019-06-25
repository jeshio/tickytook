import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store } from '.';
import Presentation, { IPresentationProps } from './Presentation';
import PresentationShortMode, { IPresentationShortModeProps } from './PresentationShortMode';

interface IContainerProps extends Store.ISelectors, Store.IActions {
  isShortModeVersion?: boolean;
}

class Container extends Component<IContainerProps> {
  public static defaultProps = {
    isShortModeVersion: false,
  };

  public render() {
    if (this.props.isExtendedMode) {
      return createElement<IPresentationProps>(Presentation, this.props);
    } else if (this.props.isShortModeVersion) {
      return createElement<IPresentationShortModeProps>(PresentationShortMode, this.props);
    }

    return null;
  }
}

export default connect<Store.ISelectors, Store.IActions, void, Store.IStore>(
  state => Store.selectors(state) as Store.ISelectors,
  (dispatch: Dispatch) =>
    bindActionCreators(Store.actions as ICStringIndexes, dispatch) as Store.IActions
)(Container);
