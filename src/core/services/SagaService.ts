import { Saga } from '@redux-saga/core';
import { all, fork } from 'redux-saga/effects';

export default class SagaService<SagaWorkers extends { [key: string]: Saga }> {
  protected pSagaWorkers: SagaWorkers = {} as SagaWorkers;
  protected pSagaWatchers: Saga[] = [];

  constructor() {
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
}
