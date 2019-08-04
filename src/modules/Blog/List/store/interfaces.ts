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
}

export interface ISelectors extends IStore {}

export interface IActions {
  fetchArticles: () => ICAction;
  fetchArticlesFailure: () => ICAction;
  fetchArticlesSuccess: (articles: IArticle[]) => ICAction;
}

export interface IEndPoints extends ICEndPoints {
  articles: ICEndPoint<IArticle[]>;
}

export interface ISagaWorkers extends ICSagas {
  fetchArticles: Saga;
}
