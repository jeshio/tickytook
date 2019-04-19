import ICStore from '../interfaces/ICStore';

export type TSelectors<T> = (store: ICStore) => T;
