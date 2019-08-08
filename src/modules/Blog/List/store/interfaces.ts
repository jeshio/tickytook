import { IArticle } from 'modules/Blog/List';
import { Saga } from 'redux-saga';
import ICEndPoint from 'src/core/interfaces/ICEndPoint';
import ICEndPoints from 'src/core/interfaces/ICEndPoints';
import ICAction from 'src/core/store/interfaces/ICAction';
import ICSagas from 'src/core/store/interfaces/ICSagas';

export interface IStore {
  articles: {
    data: IArticle[];
    loading: boolean;
  };
  article: {
    data: IArticle | null;
    loading: boolean;
  };
}

export interface ISelectors extends IStore {}

export interface IActions {
  fetchArticles: () => ICAction;
  fetchArticlesFailure: () => ICAction;
  fetchArticlesSuccess: (articles: IArticle[]) => ICAction;
  fetchArticle: (slug: string) => ICAction;
  fetchArticleFailure: () => ICAction;
  fetchArticleSuccess: (article: IArticle) => ICAction;
  resetArticle: () => ICAction;
}

export interface IEndPoints extends ICEndPoints {
  articles: ICEndPoint<IArticle[]>;
  articleBySlug: ICEndPoint<IArticle, {}, { 'fields.slug': string }>;
}

export interface ISagaWorkers extends ICSagas {
  fetchArticles: Saga;
  fetchArticle: Saga;
}