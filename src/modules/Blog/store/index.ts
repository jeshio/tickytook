import update from 'immutability-helper';
import BaseStore from 'src/core/store/BaseStore';
import { getApiReducer } from 'src/core/store/helpers/getApiReducer';
import { MODULE_NAME } from '../constants';
import Api from './api';
import { IActions, ISelectors, IStore } from './interfaces';
import sagas from './sagas';

const store = new BaseStore<IStore, IActions, ISelectors, typeof Api.endPoints>(
  MODULE_NAME,
  {
    fetchArticles: getApiReducer('articles'),
    fetchArticle: getApiReducer('article'),
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
  },
  {
    articles: state => ({
      ...state.articles,
      data: state.articles.data,
    }),
  }
);

store.setApi(Api.endPoints);

const { selectors, actions, reducers } = store;

const rootSaga = sagas(store);

export { selectors, actions, reducers, rootSaga };

export * from './interfaces';

export default reducers;
