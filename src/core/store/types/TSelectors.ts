import IStore from '../interfaces/IStore';

export type TSelectors<T> = (store: IStore) => T;
