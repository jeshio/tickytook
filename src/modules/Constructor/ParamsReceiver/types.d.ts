import { IActions, ISelectors } from 'src/modules/Globals/Base/store';
import { Store } from '.';

declare module 'modules/Constructor/ParamsReceiver' {
  interface Actions extends Store.IActions {
    baseActions: IActions;
  }

  interface Selectors extends Store.ISelectors {
    baseSelectors: ISelectors;
  }
}
