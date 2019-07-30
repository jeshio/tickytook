import * as React from 'react';
import { connect } from 'react-redux';
import { Store as BaseStore } from 'src/modules/Globals/Base';
import Presentation from './Presentation';

export interface IContainerProps extends BaseStore.ISelectors {}

class Container extends React.Component<IContainerProps> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default connect<BaseStore.ISelectors>(state => BaseStore.selectors(state))(Container);
