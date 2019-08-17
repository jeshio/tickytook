import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import BaseStore from 'src/core/store/BaseStore';
import ICAction from 'src/core/store/interfaces/ICAction';
import Api from './api';
import { IActions, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers>();

  sagaService.addSagaWorker('fetchArticles', function*(payload) {
    try {
      const requestData: ReturnType<IEndPoints['articles']['successResponse']> = yield call(
        store.api.articles,
        undefined
      );

      yield put(store.actions.fetchArticlesSuccess(requestData));
      payload.payload[0]();
    } catch (e) {
      yield put(store.actions.fetchArticlesFailure());
    } finally {
      if (yield cancelled()) {
        yield put(store.actions.fetchArticlesFailure());
      }
    }
  });

  sagaService.addSagaWorker('fetchArticle', function*(action: ICAction<[string]>) {
    try {
      const requestData: ReturnType<IEndPoints['articleBySlug']['successResponse']> = yield call(
        store.api.articleBySlug,
        {
          'fields.slug': action.payload[0],
        }
      );
      yield put(store.actions.fetchArticleSuccess(requestData));
      (action as any).payload[1]();
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
