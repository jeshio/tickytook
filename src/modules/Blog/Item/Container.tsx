import { Actions, Selectors } from 'modules/Blog/List';
import * as React from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store } from '../List';
import Presentation from './Presentation';

interface IPathParams {
  slug: string;
}

export interface IContainerProps extends Selectors, Actions, RouteComponentProps<IPathParams> {}

class Container extends React.Component<IContainerProps, any> {
  public componentWillUnmount() {
    this.props.resetArticle();
  }

  public render() {
    return <Presentation {...this.props} />;
  }
}

export default compose(
  withRouter,
  connect<Selectors, Actions>(
    state => Store.selectors(state),
    (dispatch: Dispatch) =>
      bindActionCreators(Store.actions as ICStringIndexes, dispatch) as Actions
  ),
  frontloadConnect(async (props: IContainerProps) => {
    const { slug } = props.match.params;
    await new Promise(resolve => (props.fetchArticle as any)(slug, resolve));
  })
)(Container) as React.ComponentType;
