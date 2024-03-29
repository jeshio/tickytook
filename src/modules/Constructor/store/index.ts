import update from 'immutability-helper';
import uniq from 'lodash/uniq';
import { compose } from 'redux';
import BaseStore from 'src/core/store/BaseStore';
import { getApiReducer } from 'src/core/store/helpers/getApiReducer';
import { AUTO_HASHTAGS_COUNT } from '../constants';
import { MODULE_NAME } from '../constants';
import addInvisibleSpacesToLineBreaks from '../utils/addInvisibleSpacesToLineBreaks';
import cutEndSpacesFromText from '../utils/cutEndSpacesFromText';
import cutHashtagsFromText from '../utils/cutHashtagsFromText';
import getHashtagsFromText from '../utils/getHashtagsFromText';
import getHashtagsFromWords from '../utils/getHashtagsFromWords';
import Api from './api';
import { IActions, ISelectors, IStore } from './interfaces';
import sagas from './sagas';

const store = new BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>(
  MODULE_NAME,
  {
    addExtraHashtag: (state, action) =>
      update(state, {
        extraHashtags: { $set: [...state.extraHashtags, action.payload[0]] },
      }),
    changeWords: (state, action) => ({
      ...state,
      words: action.payload[0],
    }),
    fetchExtraWords: {
      ...getApiReducer('extraWords'),
      success: (state, action) => {
        const extraWords = uniq(
          action.payload[0].length > 0 ? action.payload[0] : state.extraWords.data
        );
        return update(state, {
          extraWords: {
            loading: { $set: false },
            data: { $set: extraWords },
          },
          // если установлено мало хэштегов, то дополняем автоматом
          extraHashtags: {
            $set:
              state.extraHashtags.length < AUTO_HASHTAGS_COUNT
                ? state.extraHashtags.concat(
                    extraWords.slice(0, AUTO_HASHTAGS_COUNT - state.extraHashtags.length)
                  )
                : state.extraHashtags,
          },
        });
      },
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
    changeText: (state, action) =>
      update(state, {
        sourceText: { $set: action.payload[0] },
      }),
    makeResultText: (state, action) =>
      update(state, {
        resultText: {
          $set: compose(
            cutEndSpacesFromText,
            cutHashtagsFromText,
            addInvisibleSpacesToLineBreaks
          )(action.payload[0]),
        },
      }),
    setMinimumHashtagLength: (state, action) =>
      update(state, {
        params: {
          minimumHashtagLength: { $set: action.payload[0] },
        },
      }),
    switchParam: (state, action) =>
      update(state, {
        params: {
          [action.payload[0]]: { $set: !state.params[action.payload[0]] },
        },
      }),
    wiz: state =>
      update(state, {
        extraHashtags: {
          $set: uniq([...state.extraHashtags, ...getHashtagsFromText(state.sourceText)]),
        },
      }),
    switchMode: state => ({ ...state, isExtendedMode: !state.isExtendedMode }),
    reset: state => state,
  },
  {
    sourceText: '',
    resultText: '',
    extraHashtags: [],
    extraWords: {
      data: [],
      loading: false,
    },
    inactiveHashtags: [],
    words: [],
    params: {
      convertToLower: true,
      deleteNumberWords: true,
      minimumHashtagLength: 3,
      sortByAlphabet: false,
    },
    isExtendedMode: false,
  },
  {
    extraWords: s =>
      update(s.extraWords, {
        data: {
          $set: getHashtagsFromWords(s.extraWords.data, { ...s, ...s.params }, false),
        },
      }),
    hashtags: s => getHashtagsFromWords([], { ...s, ...s.params }, false).map(w => `#${w}`),
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
