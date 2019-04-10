import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../constants';
import { SUB_MODULE_NAME } from './constants';

export interface IStore {
  words: string[];
}

export interface ISelectors extends IStore {}

export interface IActions {
  changeWords: (words: string[]) => void;
}

const store = new BaseStore<IStore, IActions, ISelectors>(MODULE_NAME, SUB_MODULE_NAME);

store.addStoreField('words', []).addScaffold('changeWords', (state, action) => ({
  ...state,
  words: action.payload[0],
}));

const { selectors, actions, reducers } = store;

export { selectors, actions, reducers };

export default reducers;
