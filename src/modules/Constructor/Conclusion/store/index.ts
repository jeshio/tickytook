import update from 'immutability-helper';
import uniq from 'lodash/uniq';
import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../../constants';
import { Store as ParamsReceiverStore } from '../../ParamsReceiver';
import { AUTO_HASHTAGS_COUNT, SUB_MODULE_NAME } from '../constants';
import getHashtagsFromWords from '../utils/getHashtagsFromWords';
import Api from './api';
import { IActions, ISelectors, IStore } from './interfaces';
import sagas from './sagas';

const store = new BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>(
  MODULE_NAME,
  SUB_MODULE_NAME,
  {
    addExtraHashtag: (state, action) =>
      update(state, {
        extraHashtags: { $set: [...state.extraHashtags, action.payload[0]] },
      }),
    changeWords: (state, action) => ({
      ...state,
      words: action.payload[0],
    }),
    fetchExtraWords: state => update(state, { extraWords: { loading: { $set: true } } }),
    fetchExtraWordsFailure: state =>
      update(state, {
        extraWords: { loading: { $set: false } },
      }),
    fetchExtraWordsSuccess: (state, action) => {
      const extraWords = uniq(
        action.payload[0].length > 0 ? action.payload[0] : state.extraWords.data
      );
      return update(state, {
        extraWords: {
          loading: { $set: false },
          data: { $set: extraWords },
        },
        // если ни одного хэштега не установлено, то добавляем автоматом
        extraHashtags: {
          $set:
            state.extraHashtags.length === 0
              ? extraWords.slice(0, AUTO_HASHTAGS_COUNT)
              : state.extraHashtags,
        },
      });
    },
    switchHashtagActiveStatus: (state, action) => {
      const hashtag = action.payload[0];
      const inactiveHashtags = [...state.inactiveHashtags];
      if (state.inactiveHashtags.includes(hashtag)) {
        inactiveHashtags.splice(state.inactiveHashtags.indexOf(hashtag), 1);
      } else {
        inactiveHashtags.push(hashtag);
      }
      return update(state, {
        inactiveHashtags: { $set: inactiveHashtags },
      });
    },
    reset: state => state,
  },
  {
    extraHashtags: [],
    extraWords: {
      data: [],
      loading: false,
    },
    inactiveHashtags: [],
    words: [],
  },
  {
    extraWords: (s, globalStore) =>
      update(s.extraWords, {
        data: {
          $set: getHashtagsFromWords(
            s.extraWords.data,
            { ...s, ...ParamsReceiverStore.selectors(globalStore) },
            false
          ),
        },
      }),
    hashtags: (s, globalStore) =>
      getHashtagsFromWords([], { ...s, ...ParamsReceiverStore.selectors(globalStore) }, false).map(
        w => `#${w}`
      ),
    activeHashtags: (s, globalStore, stateSelectors) => {
      return stateSelectors.hashtags.filter(h => !stateSelectors.inactiveHashtags.includes(h));
    },
  }
);

store.setAction('reset', state => ({ ...state, ...store.initialStore }));

store.setApi(Api.endPoints);

const { selectors, actions, reducers } = store;

const rootSaga = sagas(store);

export { selectors, actions, reducers, rootSaga };

export * from './interfaces';

export default reducers;
