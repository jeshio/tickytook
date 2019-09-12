import { SagaIterator } from 'redux-saga';
import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import BaseStore from 'src/core/store/BaseStore';
import Api from './api';
import { IActionsParameters, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActionsParameters, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers>();

  sagaService.addSagaWorker('fetchArticles', function*(action) {
    try {
      const requestDataGenerator: unknown = yield call(store.api.articles, undefined);
      const requestData = requestDataGenerator as ReturnType<
        IEndPoints['articles']['successResponse']
      >;

      yield put(store.actions.fetchArticlesSuccess(requestData));
      if (action.payload[0]) {
        action.payload[0].resolve();
      }
    } catch (e) {
      yield put(store.actions.fetchArticlesFailure());
    } finally {
      if (yield cancelled()) {
        yield put(store.actions.fetchArticlesFailure());
      }
    }
  });

  sagaService.addSagaWorker('fetchArticle', function*(action) {
    try {
      const requestDataGenerator: unknown = yield call(store.api.articleBySlug, {
        'fields.slug': action.payload[0],
      });
      const requestData = requestDataGenerator as ReturnType<
        IEndPoints['articleBySlug']['successResponse']
      >;
      yield put(store.actions.fetchArticleSuccess(requestData));

      if (action.payload[1]) {
        action.payload[1].resolve();
      }
    } catch (e) {
      yield put(store.actions.fetchArticleFailure());
    } finally {
      if (yield cancelled()) {
        yield put(store.actions.fetchArticleFailure());
      }
    }
  });

  // articles fetcher
  sagaService.addSagaWatcher(function*() {
    yield takeLatest(store.actions.fetchArticles.type, sagaService.sagaWorkers.fetchArticles);
  });

  // article fetcher
  sagaService.addSagaWatcher(function*() {
    yield takeLatest(store.actions.fetchArticle.type, sagaService.sagaWorkers.fetchArticle);
  });

  return sagaService.rootSaga;
}
