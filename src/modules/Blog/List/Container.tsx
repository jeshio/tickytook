import { Actions, Selectors } from 'modules/Blog/List';
import * as React from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store } from '.';
import Presentation from './Presentation';

export interface IContainerProps extends Actions, Selectors {}

class Container extends React.Component<IContainerProps> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default compose(
  connect<Selectors, Actions>(
    state => Store.selectors(state),
    (dispatch: Dispatch) =>
      bindActionCreators(Store.actions as ICStringIndexes, dispatch) as Actions
  ),
  frontloadConnect(async (props: IContainerProps) => {
    await new Promise(resolve => (props.fetchArticles as any)(resolve));
  })
)(Container) as React.ComponentType;
