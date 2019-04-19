import { Saga } from '@redux-saga/core';
import isEqual from 'lodash/isEqual';
import { call, delay, put, select, take } from 'redux-saga/effects';
import ICAction from 'src/core/store/interfaces/ICAction';
import ICSagas from 'src/core/store/interfaces/ICSagas';
import WithSagasStore from 'src/core/store/WithSagasStore';
import { MODULE_NAME } from '../constants';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import { SUB_MODULE_NAME } from './constants';
import getHashtagsFromWords from './utils/getHashtagsFromWords';
import splitTextOnWords from './utils/splitTextOnWords';

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
  changeWords: (words: string[]) => ICAction;
  switchHashtagActiveStatus: (hashtag: string) => ICAction;
  switchConvertToLower: () => ICAction;
  switchDeleteNumberWords: () => ICAction;
  switchSortByAlphabet: () => ICAction;
  setMinimumHashtagLength: (length: number) => ICAction;
}

export interface ISagaWorkers extends ICSagas {
  loadHashtagsStats: Saga;
  updateWords: Saga;
}

const store = new WithSagasStore<IStore, IActions, ISelectors, ISagaWorkers>(
  MODULE_NAME,
  SUB_MODULE_NAME
);

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

store.addSagaWorker('loadHashtagsStats', function*() {
  yield delay(1500);
  // start request
  yield delay(1500);
  // return request
});
store.addSagaWorker('updateWords', function*(newText: string, oldText = '') {
  const currentStore = yield select();
  const oldWords = store.selectors(currentStore).words;

  if (oldText !== newText) {
    const words = splitTextOnWords(newText);

    if (!isEqual(words, oldWords)) {
      yield put(store.actions.changeWords(words));
    }
  }
});

// change words watcher
store.addSagaWatcher(function*() {
  yield store.takeLatest('changeWords', store.sagaWorkers.loadHashtagsStats);
});

// words updater
store.addSagaWatcher(function*() {
  const firstVersionText = ParamsReceiverStore.selectors(yield select()).text;
  yield call(store.sagaWorkers.updateWords, firstVersionText);

  while (true) {
    const oldText = ParamsReceiverStore.selectors(yield select()).text;
    yield take(ParamsReceiverStore.actions.changeText.type);
    const newText = ParamsReceiverStore.selectors(yield select()).text;
    yield call(store.sagaWorkers.updateWords, newText, oldText);
  }
});

const { selectors, actions, reducers, rootSaga } = store;

export { selectors, actions, reducers, rootSaga };

export default reducers;
