import { IProps } from 'modules/Blog/Item';
import { IActions, ISelectors } from 'modules/Blog/List';
import * as React from 'react';
import { frontloadConnect } from 'react-frontload';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose, Dispatch } from 'redux';
import connect from 'src/core/hocs/connect';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store } from '..';
import Presentation from './Presentation';

interface IPathParams {
  slug: string;
}

export interface IContainerProps extends IProps, RouteComponentProps<IPathParams> {}

class Container extends React.Component<IContainerProps, any> {
  public componentWillUnmount() {
    this.props.actions.resetArticle();
  }

  public render() {
    return <Presentation {...this.props} />;
  }
}

export default compose(
  withRouter,
  connect<ISelectors, IActions>(
    state => Store.selectors(state),
    (dispatch: Dispatch) =>
      bindActionCreators(Store.actions as ICStringIndexes, dispatch) as IActions
  ),
  frontloadConnect(async (props: IContainerProps) => {
    const { slug } = props.match.params;
    await new Promise(resolve => (props.actions.fetchArticle as any)(slug, resolve));
  })
)(Container) as React.ComponentType;
