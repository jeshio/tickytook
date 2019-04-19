import CIAction from '../interfaces/ICAction';
import ICStore from '../interfaces/ICStore';

export type TReducer<StoreT = ICStore, PayloadT = {}> = (
  store: StoreT,
  action: CIAction<PayloadT>
) => StoreT;
