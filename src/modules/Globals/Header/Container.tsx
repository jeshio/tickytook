import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store as BaseStore } from 'src/modules/Globals/Base';
import Presentation from './Presentation';

export interface IContainerProps extends BaseStore.IActions, BaseStore.ISelectors {}

class Container extends React.Component<IContainerProps, any> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default connect<BaseStore.ISelectors, BaseStore.IActions>(
  state => BaseStore.selectors(state) as BaseStore.ISelectors,
  (dispatch: Dispatch) =>
    bindActionCreators(BaseStore.actions as ICStringIndexes, dispatch) as BaseStore.IActions
)(Container);
