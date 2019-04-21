import isEqual from 'lodash/isEqual';
import { call, delay, put, select, take, takeLatest } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import BaseStore from 'src/core/store/BaseStore';
import { Store as ParamsReceiverStore } from '../../ParamsReceiver';
import splitTextOnWords from '../utils/splitTextOnWords';
import Api from './api';
import { IActions, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers>();

  sagaService.addSagaWorker('loadHashtagsStats', function*() {
    yield delay(500);
    const currentStoreSelectors = store.selectors(yield select());
    const request: ReturnType<IEndPoints['extraWords']['successResponse']> = (yield call(
      store.api.extraWords,
      {
        words: currentStoreSelectors.words.map(w => `%23${w}`).join('+'),
      }
    )).data;
    if (Array.isArray(request.result) && request.result.length > 0) {
      yield put(store.actions.updateExtraWords(request.result));
    }
  });
  sagaService.addSagaWorker('updateWords', function*(text: string) {
    const currentStore = yield select();
    const oldWords = store.selectors(currentStore).words;
    const words = splitTextOnWords(text);

    if (!isEqual(words, oldWords)) {
      yield put(store.actions.changeWords(words));
    }
  });

  // change words watcher
  sagaService.addSagaWatcher(function*() {
    yield takeLatest(store.actions.changeWords.type, sagaService.sagaWorkers.loadHashtagsStats);
  });

  // words updater
  sagaService.addSagaWatcher(function*() {
    const firstVersionText = ParamsReceiverStore.selectors(yield select()).text;
    yield call(sagaService.sagaWorkers.updateWords, firstVersionText);

    while (true) {
      const oldText = ParamsReceiverStore.selectors(yield select()).text;
      yield take('*');
      const newText = ParamsReceiverStore.selectors(yield select()).text;

      if (oldText !== newText) {
        yield call(sagaService.sagaWorkers.updateWords, newText);
      }
    }
  });

  return sagaService.rootSaga;
}
