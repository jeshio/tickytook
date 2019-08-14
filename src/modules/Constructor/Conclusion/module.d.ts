import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';

interface Selectors extends Store.ISelectors {
  paramsReceiver: ParamsReceiverStore.ISelectors;
}

interface Actions extends Store.IActions {
  paramsReceiverActions: ParamsReceiverStore.IActions;
}
