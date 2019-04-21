import { all, fork } from 'redux-saga/effects';
import ICModule from '../interfaces/ICModule';

export default function buildRootSaga(modules: ICModule[]) {
  const moduleSagas = modules.filter(m => m.rootSaga) as Array<Required<ICModule>>;

  return function*() {
    yield all(moduleSagas.map(s => fork(s.rootSaga)));
  };
}
