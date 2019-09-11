import { Saga } from '@redux-saga/core';
import { all, fork } from 'redux-saga/effects';
import { ICSagas } from '../store/interfaces/ICSagas';

export default class SagaService<SagaWorkers extends ICSagas<{}>> {
  protected _sagaWorkers: SagaWorkers = {} as SagaWorkers;
  protected _sagaWatchers: Saga[] = [];

  constructor() {
    this.rootSaga = this.rootSaga.bind(this);
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

  public addSagaWatcher(sagaWatcher: Saga) {
    this._sagaWatchers.push(sagaWatcher);
  }
}
