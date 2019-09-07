import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store as GlobalStore } from 'src/modules/Globals';
import Presentation from './Presentation';

export interface IContainerProps extends GlobalStore.IActions, GlobalStore.ISelectors {}

class Container extends React.Component<IContainerProps> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default connect<GlobalStore.ISelectors, GlobalStore.IActions>(
  state => GlobalStore.selectors(state) as GlobalStore.ISelectors,
  (dispatch: Dispatch) =>
    bindActionCreators(GlobalStore.actions as ICStringIndexes, dispatch) as GlobalStore.IActions
)(Container);
