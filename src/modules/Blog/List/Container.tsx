import { Actions, Selectors } from 'modules/Blog/List';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store } from '.';
import Presentation from './Presentation';

export interface IContainerProps extends Actions, Selectors {}

class Container extends React.Component<IContainerProps> {
  public componentDidMount() {
    this.props.fetchArticles();
  }

  public render() {
    return <Presentation />;
  }
}

export default connect<Selectors, Actions>(
  state => Store.selectors(state),
  (dispatch: Dispatch) => bindActionCreators(Store.actions as ICStringIndexes, dispatch) as Actions
)(Container);
