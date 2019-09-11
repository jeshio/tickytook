import { IActions, IProps, ISelectors } from 'modules/Blog/List';
import * as React from 'react';
import { frontloadConnect } from 'react-frontload';
import { bindActionCreators, compose, Dispatch } from 'redux';
import connect from 'src/core/hocs/connect';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { Store } from '..';
import Presentation from './Presentation';

export interface IContainerProps extends IProps {}

class Container extends React.Component<IContainerProps> {
  public render() {
    return <Presentation {...this.props} />;
  }
}

export default compose(
  connect<ISelectors, IActions>(
    state => Store.selectors(state),
    (dispatch: Dispatch) =>
      bindActionCreators(Store.actions as ICStringIndexes, dispatch) as IActions
  ),
  frontloadConnect(async (props: IContainerProps) => {
    await new Promise((resolve, reject) => props.actions.fetchArticles({ resolve, reject }));
  })
)(Container) as React.ComponentType;
