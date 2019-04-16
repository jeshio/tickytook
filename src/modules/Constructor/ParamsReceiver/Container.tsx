import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import IStringIndexes from 'src/core/interfaces/IStringIndexes';
import { Store } from '.';
import Presentation, { IPresentationProps } from './Presentation';

class Container extends Component<Store.ISelectors & Store.IActions> {
  public render() {
    return createElement<IPresentationProps>(Presentation, this.props);
  }
}

export default connect<Store.ISelectors, Store.IActions, void, Store.IStore>(
  state => Store.selectors(state) as Store.ISelectors,
  (dispatch: Dispatch) =>
    bindActionCreators(Store.actions as IStringIndexes, dispatch) as Store.IActions
)(Container);
