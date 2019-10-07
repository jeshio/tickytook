import ICPropsWithStore from 'src/core/interfaces/ICPropsWithStore';
import * as Global from 'src/modules/Global';
import { Store } from '..';

declare module 'modules/Constructor/ParamsReceiver' {
  interface ISelectors extends Store.ISelectors {
    global: Global.Store.ISelectors;
  }

  interface IActions extends Store.IActions {
    global: Global.Store.IActions;
  }

  interface IProps extends ICPropsWithStore<ISelectors, IActions> {}
}
