import CIAction from '../interfaces/CIAction';
import CIStore from '../interfaces/CIStore';

export type TReducer<StoreT = CIStore, PayloadT = {}> = (
  store: StoreT,
  action: CIAction<PayloadT>
) => StoreT;
