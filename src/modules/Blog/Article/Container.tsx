import * as React from 'react';
import { connect } from 'react-redux';
import Presentation from './Presentation';

export interface IContainerProps {}

class Container extends React.Component<IContainerProps, any> {
  public render() {
    return <Presentation />;
  }
}

const mapState2Props = () => {
  return {};
};

export default connect(mapState2Props)(Container);
