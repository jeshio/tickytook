import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import BaseStore from 'src/core/store/BaseStore';
import Api from './api';
import { IActions, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers>();

  sagaService.addSagaWorker('fetchArticles', function*() {
    try {
      const requestData: ReturnType<IEndPoints['articles']['successResponse']> = yield call(
        store.api.articles,
        undefined
      );

      yield put(store.actions.fetchArticlesSuccess(requestData));
    } catch (e) {
      yield put(store.actions.fetchArticlesFailure());
    } finally {
      if (yield cancelled()) {
        yield put(store.actions.fetchArticlesFailure());
      }
    }
  });

  // article fetcher
  sagaService.addSagaWatcher(function*() {
    yield takeLatest(store.actions.fetchArticles.type, sagaService.sagaWorkers.fetchArticles);
  });

  return sagaService.rootSaga;
}
