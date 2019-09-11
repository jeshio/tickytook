import isEqual from 'lodash/isEqual';
import { Saga } from 'redux-saga';
import { call, cancel, cancelled, delay, fork, put, race, select, take } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import BaseStore from 'src/core/store/BaseStore';
import { Store } from '..';
import splitTextOnWords from '../utils/splitTextOnWords';
import Api from './api';
import { IActions, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers>();

  sagaService.addSagaWorker('updateWords', function*(text) {
    const currentStore = ((yield select()) as unknown) as IStore;
    const oldWords = store.selectors(currentStore).words;
    const words = splitTextOnWords(text);

    if (!isEqual(words, oldWords)) {
      yield put(store.actions.changeWords(words));
    }
  });

  sagaService.addSagaWorker('fetchExtraWords', function*() {
    try {
      const currentStoreSelectors = store.selectors(((yield select()) as unknown) as IStore);
      const requestData = ((yield call(store.api.extraWords, {
        words: currentStoreSelectors.words,
      })) as unknown) as ReturnType<IEndPoints['extraWords']['successResponse']>;

      yield put(store.actions.fetchExtraWordsSuccess(requestData.result || []));
    } catch (e) {
      yield put(store.actions.fetchExtraWordsFailure());
    } finally {
      if (yield cancelled()) {
        yield put(store.actions.fetchExtraWordsFailure());
      }
    }
  } as Saga);

  // extra words fetcher
  sagaService.addSagaWatcher(function*() {
    yield fork(function*() {
      let lastTask: any;

      while (true) {
        const action = yield race({
          wiz: take(Store.actions.wiz.type),
          fetchExtraWords: take(store.actions.fetchExtraWords.type),
        });

        if (lastTask) {
          yield cancel(lastTask);
        }

        lastTask = yield fork(function*() {
          if (!action.fetchExtraWords) {
            yield put(store.actions.fetchExtraWords());
          }

          const fetchTask = yield fork(sagaService.sagaWorkers.fetchExtraWords);

          if (yield take(store.actions.reset.type)) {
            yield cancel([fetchTask, lastTask]);
          }
        });
      }
    });
  });

  // words updater
  sagaService.addSagaWatcher(function*() {
    const firstVersionText = Store.selectors(((yield select()) as unknown) as IStore).text;
    yield call(sagaService.sagaWorkers.updateWords, firstVersionText);

    if (String(firstVersionText).length > 0) {
      yield put(store.actions.fetchExtraWords());
    }

    while (true) {
      const oldText = Store.selectors(((yield select()) as unknown) as IStore).text;
      yield race([take(Store.actions.changeText.type), take(Store.actions.reset.type)]);

      const newText = Store.selectors(((yield select()) as unknown) as IStore).text;

      if (oldText !== newText) {
        yield call(sagaService.sagaWorkers.updateWords, newText);
      }
    }
  });

  sagaService.addSagaWatcher(function*() {
    while (true) {
      yield take(Store.actions.reset.type);
      yield put(store.actions.reset());
    }
  });

  return sagaService.rootSaga;
}
