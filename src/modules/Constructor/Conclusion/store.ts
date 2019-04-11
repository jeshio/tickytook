import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../constants';
import { SUB_MODULE_NAME } from './constants';
import getHashtagsFromWords from './utils/getHashtagsFromWords';

export interface IStore {
  words: string[];
  hashTags: string[];
  convertToLower: boolean;
  deleteDuplicates: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
}

export interface ISelectors extends IStore {}

export interface IActions {
  changeWords: (words: string[]) => void;
  switchConvertToLower: () => void;
  switchDeleteDuplicates: () => void;
  switchDeleteNumberWords: () => void;
  switchSortByAlphabet: () => void;
  setMinimumHashtagLength: (length: number) => void;
}

const store = new BaseStore<IStore, IActions, ISelectors>(MODULE_NAME, SUB_MODULE_NAME);

const updateWithHashTags = (state: IStore): IStore => ({
  ...state,
  hashTags: getHashtagsFromWords(state, false),
});

store.addStoreField('words', []).addAction('changeWords', (state, action) =>
  updateWithHashTags({
    ...state,
    words: action.payload[0],
  })
);

store.addStoreField('convertToLower', true).addAction('switchConvertToLower', state =>
  updateWithHashTags({
    ...state,
    convertToLower: !state.convertToLower,
  })
);

store.addStoreField('deleteDuplicates', true).addAction('switchDeleteDuplicates', state =>
  updateWithHashTags({
    ...state,
    deleteDuplicates: !state.deleteDuplicates,
  })
);

store.addStoreField('deleteNumberWords', true).addAction('switchDeleteNumberWords', state =>
  updateWithHashTags({
    ...state,
    deleteNumberWords: !state.deleteNumberWords,
  })
);

store.addStoreField('sortByAlphabet', true).addAction('switchSortByAlphabet', state =>
  updateWithHashTags({
    ...state,
    sortByAlphabet: !state.sortByAlphabet,
  })
);

store
  .addStoreField('minimumHashtagLength', 3)
  .addAction('setMinimumHashtagLength', (state, action) =>
    updateWithHashTags({
      ...state,
      minimumHashtagLength: action.payload[0],
    })
  );

store.addStoreField('hashTags', []);

const { selectors, actions, reducers } = store;

export { selectors, actions, reducers };

export default reducers;
