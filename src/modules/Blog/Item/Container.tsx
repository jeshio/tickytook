import { IProps } from 'modules/Blog/Item';
import { IActions, ISelectors } from 'modules/Blog/List';
import * as React from 'react';
import { frontloadConnect } from 'react-frontload';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose, Dispatch } from 'redux';
import bindActionCreatorsWithApi from 'src/core/helpers/bindActionCreatorsWithApi';
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
      bindActionCreatorsWithApi(Store.actions as ICStringIndexes, dispatch) as IActions
  ),
  frontloadConnect(async (props: IContainerProps) => {
    const { slug } = props.match.params;
    await new Promise((resolve, reject) =>
      props.actions.fetchArticle.request(slug, { resolve, reject })
    );
  })
)(Container) as React.ComponentType;
