import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import Presentation from './Presentation';

export interface IContainerProps
  extends ParamsReceiverStore.IActions,
    ParamsReceiverStore.ISelectors {}

class Container extends React.Component<IContainerProps, any> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default connect<ParamsReceiverStore.ISelectors, ParamsReceiverStore.IActions>(
  state => ParamsReceiverStore.selectors(state) as ParamsReceiverStore.ISelectors,
  (dispatch: Dispatch) =>
    bindActionCreators(
      ParamsReceiverStore.actions as ICStringIndexes,
      dispatch
    ) as ParamsReceiverStore.IActions
)(Container);
