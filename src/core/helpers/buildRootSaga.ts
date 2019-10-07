import { all, fork } from 'redux-saga/effects';
import { DeepRequired } from 'utility-types';
import ICModule from '../interfaces/ICModule';

export default function buildRootSaga(modules: ICModule[]) {
  const moduleSagas = modules.filter(m => m.Store && m.Store.rootSaga) as Array<
    DeepRequired<ICModule>
  >;

  return function*() {
    yield all(moduleSagas.map(s => fork(s.Store.rootSaga)));
  };
}
