import uniq from 'lodash/uniq';
import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../../constants';
import { Store as ParamsReceiverStore } from '../../ParamsReceiver';
import { SUB_MODULE_NAME } from '../constants';
import getHashtagsFromWords from '../utils/getHashtagsFromWords';
import Api from './api';
import { IActions, IEndPoints, ISelectors, IStore } from './interfaces';
import sagas from './sagas';

const switchAction = (fieldName: keyof IStore) => (state: IStore) => ({
  ...state,
  [fieldName]: !state[fieldName],
});

const store = new BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>(
  MODULE_NAME,
  SUB_MODULE_NAME,
  {
    addExtraHashtag: (state, action) => ({
      ...state,
      extraHashtags: [...state.extraHashtags, action.payload[0]],
    }),
    changeWords: (state, action) => ({
      ...state,
      words: action.payload[0],
    }),
    fetchExtraWords: state => ({ ...state, extraWords: { ...state.extraWords, loading: true } }),
    fetchExtraWordsFailure: state => ({
      ...state,
      extraWords: { ...state.extraWords, loading: false },
    }),
    fetchExtraWordsSuccess: (state, action) => ({
      ...state,
      extraWords: {
        ...state.extraWords,
        loading: false,
        data: uniq([...action.payload[0], ...state.extraWords.data]),
      },
    }),
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
    reset: state => state,
  },
  {
    extraHashtags: [],
    extraWords: {
      data: [],
      loading: false,
    },
    inactiveHashtags: new Set(),
    words: [],
  },
  {
    extraWords: (s, globalStore) => ({
      ...s.extraWords,
      data: getHashtagsFromWords(
        s.extraWords.data,
        { ...s, ...ParamsReceiverStore.selectors(globalStore) },
        false
      ),
    }),
    hashtags: (s, globalStore) =>
      getHashtagsFromWords(
        s.words,
        { ...s, ...ParamsReceiverStore.selectors(globalStore) },
        false
      ).map(w => `#${w}`),
    activeHashtags: (s, globalStore, stateSelectors) =>
      stateSelectors.hashtags.filter(h => !s.inactiveHashtags.has(h)),
  }
);

store.setAction('reset', state => ({ ...state, ...store.initialStore }));

store.setApi(Api.endPoints);

const { selectors, actions, reducers } = store;

const rootSaga = sagas(store);

export { selectors, actions, reducers, rootSaga };

export * from './interfaces';

export default reducers;
