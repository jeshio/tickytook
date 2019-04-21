import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../../constants';
import { SUB_MODULE_NAME } from '../constants';
import getHashtagsFromWords from '../utils/getHashtagsFromWords';
import Api from './api';
import { IActions, IEndPoints, ISelectors, IStore } from './interfaces';
import sagas from './sagas';

const updateWithHashtags = (state: IStore): IStore => ({
  ...state,
  hashtags: getHashtagsFromWords(state, false),
});

const switchAction = (fieldName: keyof IStore) => (state: IStore) =>
  updateWithHashtags({
    ...state,
    [fieldName]: !state[fieldName],
  });

const store = new BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>(
  MODULE_NAME,
  SUB_MODULE_NAME,
  {
    actions: {
      changeWords: (state, action) =>
        updateWithHashtags({
          ...state,
          words: action.payload[0],
        }),
      setMinimumHashtagLength: (state, action) =>
        updateWithHashtags({
          ...state,
          minimumHashtagLength: action.payload[0],
        }),
      switchConvertToLower: switchAction('convertToLower'),
      switchDeleteNumberWords: switchAction('deleteNumberWords'),
      switchHashtagActiveStatus: (state, action) => {
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
      },
      switchSortByAlphabet: switchAction('sortByAlphabet'),
      updateExtraWords: (state, action) => ({ ...state, extraWords: action.payload[0] }),
    },
    fields: {
      convertToLower: true,
      deleteNumberWords: true,
      extraWords: [],
      hashtags: [],
      inactiveHashtags: new Set(),
      minimumHashtagLength: 3,
      sortByAlphabet: true,
      words: [],
    },
    selectors: {
      activeHashtags: s => s.hashtags.filter(h => !s.inactiveHashtags.has(h)),
    },
  }
);

store.setApi(Api.endPoints);

const { selectors, actions, reducers } = store;

const rootSaga = sagas(store);

export { selectors, actions, reducers, rootSaga };

export * from './interfaces';

export default reducers;
