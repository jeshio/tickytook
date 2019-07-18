import * as React from 'react';
import { connect } from 'react-redux';
import Presentation from './Presentation';

export interface IContainerProps {}

class Container extends React.Component<IContainerProps, any> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default connect(state => ({}))(Container);
