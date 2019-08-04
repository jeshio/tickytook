import update from 'immutability-helper';
import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../../constants';
import { SUB_MODULE_NAME } from '../constants';
import Api from './api';
import { IActions, ISelectors, IStore } from './interfaces';
import sagas from './sagas';

const store = new BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>(
  MODULE_NAME,
  SUB_MODULE_NAME,
  {
    fetchArticles: state =>
      update(state, {
        articles: {
          loading: { $set: true },
        },
      }),
    fetchArticlesFailure: state =>
      update(state, {
        articles: {
          loading: { $set: false },
        },
      }),
    fetchArticlesSuccess: (state, action) =>
      update(state, {
        articles: {
          loading: { $set: false },
          data: { $set: action.payload[0] },
        },
      }),

    fetchArticle: state =>
      update(state, {
        article: {
          loading: { $set: true },
        },
      }),
    fetchArticleFailure: state =>
      update(state, {
        article: {
          loading: { $set: false },
        },
      }),
    fetchArticleSuccess: (state, action) =>
      update(state, {
        article: {
          loading: { $set: false },
          data: { $set: action.payload[0] },
        },
      }),
    resetArticle: state =>
      update(state, {
        article: {
          data: {
            $set: null,
          },
        },
      }),
  },
  {
    articles: {
      data: [],
      loading: false,
    },
    article: {
      data: null,
      loading: false,
    },
  }
);

store.setApi(Api.endPoints);

const { selectors, actions, reducers } = store;

const rootSaga = sagas(store);

export { selectors, actions, reducers, rootSaga };

export * from './interfaces';

export default reducers;
