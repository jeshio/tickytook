import { Saga } from '@redux-saga/core';
import get from 'lodash/get';
import last from 'lodash/last';
import { all, call, cancelled, fork, put, select } from 'redux-saga/effects';
import BaseStore from '../store/BaseStore';
import ICActionPromise from '../store/interfaces/ICActionPromise';
import ICApiAction from '../store/interfaces/ICApiAction';
import { ICSagas } from '../store/interfaces/ICSagas';
import ICStore from '../store/interfaces/ICStore';

export default class SagaService<SagaWorkers extends ICSagas<{}>, TStore extends ICStore = {}> {
  protected _sagaWorkers: SagaWorkers = {} as SagaWorkers;
  protected _sagaWatchers: Saga[] = [];
  protected _baseStore = {} as BaseStore<TStore, any, any, any>;

  constructor(store: BaseStore<TStore, any, any, any>) {
    this.rootSaga = this.rootSaga.bind(this);
    this._baseStore = store;
  }

  public get sagaWorkers() {
    return this._sagaWorkers;
  }

  public *rootSaga() {
    yield all(this._sagaWatchers.map(s => fork(s)));
  }

  public addSagaWorker<K extends keyof SagaWorkers>(name: K, sagaWorker: SagaWorkers[K]) {
    this._sagaWorkers[name] = sagaWorker;
  }

  /**
   * Добавляет сагу для обработки API-запроса
   * @param name название воркера
   * @param actionGenerator генератор API экшена
   * @param apiRequest непосредственно API запрос
   * @param getRequestParams возвращает массив параметров, которые отправятся в запрос
   */
  public addSagaApiRequestWorker<K extends keyof SagaWorkers>(
    name: K,
    actionGenerator: ICApiAction<any, any, any>,
    apiRequest: (...args: any[]) => Promise<any>,
    getRequestParams: (
      action: ReturnType<typeof actionGenerator.request>,
      state: TStore
    ) => Parameters<typeof apiRequest>[0]
  ) {
    const _this = this;
    const sagaWorker: unknown = function*(action: ReturnType<(typeof actionGenerator)['request']>) {
      const promise = last(get(action, 'payload')) as ICActionPromise | undefined;
      try {
        const currentStoreSelectors = _this._baseStore.selectors(
          ((yield select()) as unknown) as TStore
        );
        const requestData = yield call(
          apiRequest,
          getRequestParams(action, currentStoreSelectors)
        ) as Parameters<typeof actionGenerator['success']>[0];

        yield put(actionGenerator.success(requestData));
        if (promise) {
          promise.resolve();
        }
      } catch (e) {
        yield put(actionGenerator.failure());
        if (promise) {
          promise.reject();
        }
      } finally {
        if (yield cancelled()) {
          yield put(actionGenerator.failure());
          if (promise) {
            promise.reject();
          }
        }
      }
    };

    this._sagaWorkers[name] = sagaWorker as SagaWorkers[K];
  }

  public addSagaWatcher(sagaWatcher: Saga) {
    this._sagaWatchers.push(sagaWatcher);
  }
}
