import IAction from '../interfaces/IAction';
import IStore from '../interfaces/IStore';

export type TReducer<StoreT = IStore, PayloadT = {}> = (
  store: StoreT,
  action: IAction<PayloadT>
) => StoreT;
