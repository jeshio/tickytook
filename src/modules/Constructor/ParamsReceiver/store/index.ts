import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../../constants';
import { SUB_MODULE_NAME } from '../constants';
import { IActions, ISelectors, IStore } from './interfaces';

const switchAction = (fieldName: keyof IStore) => (state: IStore) => ({
  ...state,
  [fieldName]: !state[fieldName],
});

const store = new BaseStore<IStore, IActions, ISelectors>(
  MODULE_NAME,
  SUB_MODULE_NAME,
  {
    changeText: (state, action) => ({
      ...state,
      text: action.payload[0],
    }),
    setMinimumHashtagLength: (state, action) => ({
      ...state,
      minimumHashtagLength: action.payload[0],
    }),
    switchConvertToLower: switchAction('convertToLower'),
    switchDeleteNumberWords: switchAction('deleteNumberWords'),
    switchSortByAlphabet: switchAction('sortByAlphabet'),
    switchSpellWordsToHashtags: switchAction('spellWordsToHashtags'),
    reset: state => state,
  },
  {
    convertToLower: true,
    deleteNumberWords: true,
    minimumHashtagLength: 3,
    sortByAlphabet: true,
    text: 'Привет, тут у нас небольшое предложение с 8 членами.',
    spellWordsToHashtags: true,
  }
);

store.setAction('reset', state => ({ ...state, ...store.initialStore }));

const { selectors, actions, reducers } = store;

export { selectors, actions, reducers };

export * from './interfaces';

export default reducers;
