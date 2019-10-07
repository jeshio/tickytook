import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import SagaService from 'src/core/services/SagaService';
import BaseStore from 'src/core/store/BaseStore';
import Api from './api';
import { IActions, IEndPoints, ISagaWorkers, ISelectors, IStore } from './interfaces';

export default function sagas(
  store: BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>
) {
  const sagaService = new SagaService<ISagaWorkers, IStore>(store);

  sagaService.addSagaApiRequestWorker(
    'fetchArticles',
    store.actions.fetchArticles,
    store.api.articles,
    () => ({})
  );

  sagaService.addSagaApiRequestWorker(
    'fetchArticle',
    store.actions.fetchArticle,
    store.api.articleBySlug,
    action => ({ 'fields.slug': action.payload[0] })
  );

  // articles fetcher
  sagaService.addSagaWatcher(function*() {
    yield takeLatest(
      store.actions.fetchArticles.request.type,
      sagaService.sagaWorkers.fetchArticles
    );
  });

  // article fetcher
  sagaService.addSagaWatcher(function*() {
    yield takeLatest(store.actions.fetchArticle.request.type, sagaService.sagaWorkers.fetchArticle);
  });

  return sagaService.rootSaga;
}
