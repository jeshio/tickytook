import isEqual from 'lodash/isEqual';
import {
  call,
  cancel,
  cancelled,
  delay,
  fork,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
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

  sagaService.addSagaWorker('updateWords', function*(text: string) {
    const currentStore = yield select();
    const oldWords = store.selectors(currentStore).words;
    const words = splitTextOnWords(text);

    if (!isEqual(words, oldWords)) {
      yield put(store.actions.changeWords(words));
    }
  });

  sagaService.addSagaWorker('fetchExtraWords', function*() {
    try {
      const currentStoreSelectors = store.selectors(yield select());
      const requestData: ReturnType<IEndPoints['extraWords']['successResponse']> = (yield call(
        store.api.extraWords,
        {
          words: currentStoreSelectors.words.map(w => `%23${w}`).join('+'),
        }
      )).data;

      yield put(store.actions.fetchExtraWordsSuccess(requestData.result || []));
    } catch (e) {
      yield put(store.actions.fetchExtraWordsFailure());
    } finally {
      if (yield cancelled()) {
        yield put(store.actions.fetchExtraWordsFailure());
      }
    }
  });

  // extra words fetcher
  sagaService.addSagaWatcher(function*() {
    yield fork(function*() {
      let lastTask;

      while (true) {
        const action = yield race({
          changeWords: take(store.actions.changeWords.type),
          fetchExtraWords: take(store.actions.fetchExtraWords.type),
        });

        if (lastTask) {
          yield cancel(lastTask);
        }

        lastTask = yield fork(function*() {
          if (action.changeWords) {
            yield delay(1000);
          }

          if (!action.fetchExtraWords) {
            yield put(store.actions.fetchExtraWords());
          }

          yield call(sagaService.sagaWorkers.fetchExtraWords);
        });
      }
    });
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
