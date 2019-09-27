import { IArticle } from 'modules/Blog';
import ICEndPoint from 'src/core/interfaces/ICEndPoint';
import ICEndPoints from 'src/core/interfaces/ICEndPoints';
import ICAction from 'src/core/store/interfaces/ICAction';
import ICActionPromise from 'src/core/store/interfaces/ICActionPromise';
import ICApiAction from 'src/core/store/interfaces/ICApiAction';
import { ICSagas } from 'src/core/store/interfaces/ICSagas';
import { ActionsFromActionsParameters } from 'src/core/store/types/ActionFromActionParameters';

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

export interface IActionsParameters {
  resetArticle: [];
}

export interface IActions extends ActionsFromActionsParameters<IActionsParameters> {
  fetchArticle: ICApiAction<[string, ICActionPromise], [IArticle]>;
  fetchArticles: ICApiAction<[ICActionPromise], [IArticle[]]>;
}

export interface IEndPoints extends ICEndPoints {
  articles: ICEndPoint<IArticle[]>;
  articleBySlug: ICEndPoint<IArticle, {}, { 'fields.slug': string }>;
}

export interface ISagaWorkers
  extends ICSagas<{
    fetchArticles: [ReturnType<IActions['fetchArticles']['request']>];
    fetchArticle: [ReturnType<IActions['fetchArticle']['request']>];
  }> {}
