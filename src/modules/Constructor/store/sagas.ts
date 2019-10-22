import isEqual from 'lodash/isEqual';
import { call, cancel, cancelled, delay, fork, put, race, select, take } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import StorageService from 'src/core/services/StorageService';
import BaseStore from 'src/core/store/BaseStore';
import { Store } from '..';
import { STORAGE_ITEMS_NAME } from '../constants';
import splitTextOnWords from '../utils/splitTextOnWords';
import Api from './api';
import { IActions, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers, IStore>(store);

  sagaService.addSagaWorker('updateWords', function*(text) {
    const currentStore = ((yield select()) as unknown) as IStore;
    const oldWords = store.selectors(currentStore).words;
    const words = splitTextOnWords(text);

    if (!isEqual(words, oldWords)) {
      yield put(store.actions.changeWords(words));
    }
  });

  sagaService.addSagaApiRequestWorker(
    'fetchExtraWords',
    store.actions.fetchExtraWords,
    store.api.extraWords,
    (action, { words }) => ({ words })
  );

  // extra words fetcher
  sagaService.addSagaWatcher(function*() {
    yield fork(function*() {
      let lastTask: any;

      while (true) {
        const action = yield race({
          wiz: take(Store.actions.wiz.type),
          fetchExtraWords: take(store.actions.fetchExtraWords.request.type),
        });

        if (lastTask) {
          yield cancel(lastTask);
        }

        lastTask = yield fork(function*() {
          if (!action.fetchExtraWords) {
            yield put(store.actions.fetchExtraWords.request());
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
    const firstVersionText = Store.selectors(((yield select()) as unknown) as IStore).sourceText;
    yield call(sagaService.sagaWorkers.updateWords, firstVersionText);

    if (String(firstVersionText).length > 0) {
      yield put(store.actions.makeResultText(firstVersionText));
      yield put(store.actions.fetchExtraWords.request());
    }

    while (true) {
      const oldText = Store.selectors(((yield select()) as unknown) as IStore).sourceText;
      yield race([take(Store.actions.changeText.type), take(Store.actions.reset.type)]);

      const newText = Store.selectors(((yield select()) as unknown) as IStore).sourceText;

      if (oldText !== newText) {
        yield call(sagaService.sagaWorkers.updateWords, newText);
        yield put(store.actions.makeResultText(newText));
        StorageService.setIn(STORAGE_ITEMS_NAME.SOURCE_TEXT, newText);
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
