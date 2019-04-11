import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../constants';
import { SUB_MODULE_NAME } from './constants';

export interface IStore {
  text: string;
}

export interface ISelectors extends IStore {}

export interface IActions {
  changeText: (text: string) => void;
}

const store = new BaseStore<IStore, IActions, ISelectors>(MODULE_NAME, SUB_MODULE_NAME);

store
  .addStoreField('text', 'Привет, тут у нас небольшое предложение с 8 членами.')
  .addAction('changeText', (state, action) => ({
    ...state,
    text: action.payload[0],
  }));

const { selectors, actions, reducers } = store;

export { selectors, actions, reducers };

export default reducers;
