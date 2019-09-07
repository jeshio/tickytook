import * as React from 'react';
import { connect } from 'react-redux';
import { Store as GlobalStore } from 'src/modules/Globals';
import Presentation from './Presentation';

export interface IContainerProps extends GlobalStore.ISelectors {}

class Container extends React.Component<IContainerProps> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default connect<GlobalStore.ISelectors>(state => GlobalStore.selectors(state))(Container);
