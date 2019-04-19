import { Saga } from '@redux-saga/core';
import { all, fork, take, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import IStringIndexes from '../interfaces/IStringIndexes';
import BaseStore from './BaseStore';
import ICAction from './interfaces/ICAction';
import ICStore from './interfaces/ICStore';

export default class WithSagasStore<
  StoreT extends ICStore,
  ActionsT extends IStringIndexes,
  SelectorsT extends IStringIndexes,
  SagaWorkers extends { [key: string]: Saga }
> extends BaseStore<StoreT, ActionsT, SelectorsT> {
  protected pSagaWorkers: SagaWorkers = {} as SagaWorkers;
  protected pSagaWatchers: Saga[] = [];

  constructor(moduleName: string, subModuleName: string) {
    super(moduleName, subModuleName);
    this.rootSaga = this.rootSaga.bind(this);
  }

  public get sagaWorkers() {
    return this.pSagaWorkers;
  }

  public *rootSaga() {
    yield all(this.pSagaWatchers.map(s => fork(s)));
  }

  public addSagaWorker<K extends keyof SagaWorkers>(name: K, sagaWorker: SagaWorkers[K]) {
    this.pSagaWorkers[name] = sagaWorker;
  }

  public addSagaWatcher(sagaWatcher: Saga) {
    this.pSagaWatchers.push(sagaWatcher);
  }

  public take<K extends keyof ActionsT>(actionName: K) {
    return take(this.makeActionType(actionName));
  }

  public throttle<K extends keyof ActionsT>(ms: number, actionName: K, worker: Saga) {
    return throttle(ms, this.makeActionType(actionName), worker);
  }

  public takeEvery<K extends keyof ActionsT>(actionName: K, worker: Saga) {
    return takeEvery(this.makeActionType(actionName), worker);
  }

  public takeLatest<K extends keyof ActionsT>(actionName: K, worker: Saga) {
    return takeLatest(this.makeActionType(actionName), worker);
  }
}
