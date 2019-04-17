import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../constants';
import { SUB_MODULE_NAME } from './constants';
import getHashtagsFromWords from './utils/getHashtagsFromWords';

export interface IStore {
  words: string[];
  hashtags: string[];
  inactiveHashtags: Set<string>;
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
}

export interface ISelectors extends IStore {
  activeHashtags: string[];
}

export interface IActions {
  changeWords: (words: string[]) => void;
  switchHashtagActiveStatus: (hashtag: string) => void;
  switchConvertToLower: () => void;
  switchDeleteNumberWords: () => void;
  switchSortByAlphabet: () => void;
  setMinimumHashtagLength: (length: number) => void;
}

const store = new BaseStore<IStore, IActions, ISelectors>(MODULE_NAME, SUB_MODULE_NAME);

const updateWithHashtags = (state: IStore): IStore => ({
  ...state,
  hashtags: getHashtagsFromWords(state, false),
});

store.addSelector('activeHashtags', s => s.hashtags.filter(h => !s.inactiveHashtags.has(h)));

store.addStoreField('words', []).addAction('changeWords', (state, action) =>
  updateWithHashtags({
    ...state,
    words: action.payload[0],
  })
);

store.addStoreField('convertToLower', true).addAction('switchConvertToLower', state =>
  updateWithHashtags({
    ...state,
    convertToLower: !state.convertToLower,
  })
);

store.addStoreField('deleteNumberWords', true).addAction('switchDeleteNumberWords', state =>
  updateWithHashtags({
    ...state,
    deleteNumberWords: !state.deleteNumberWords,
  })
);

store.addStoreField('sortByAlphabet', true).addAction('switchSortByAlphabet', state =>
  updateWithHashtags({
    ...state,
    sortByAlphabet: !state.sortByAlphabet,
  })
);

store
  .addStoreField('minimumHashtagLength', 3)
  .addAction('setMinimumHashtagLength', (state, action) =>
    updateWithHashtags({
      ...state,
      minimumHashtagLength: action.payload[0],
    })
  );

store.addStoreField('hashtags', []);

store
  .addStoreField('inactiveHashtags', new Set())
  .addAction('switchHashtagActiveStatus', (state, action) => {
    const hashtag = action.payload[0];
    const inactiveHashtags = new Set(state.inactiveHashtags);
    if (state.inactiveHashtags.has(hashtag)) {
      inactiveHashtags.delete(hashtag);
    } else {
      inactiveHashtags.add(hashtag);
    }
    return {
      ...state,
      inactiveHashtags,
    };
  });

const { selectors, actions, reducers } = store;

export { selectors, actions, reducers };

export default reducers;
