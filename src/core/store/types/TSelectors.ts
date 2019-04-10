import CIStore from '../interfaces/CIStore';

export type TSelectors<T> = (store: CIStore) => T;
