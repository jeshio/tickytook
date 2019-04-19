import { all, fork } from 'redux-saga/effects';
import IModule from '../interfaces/IModule';

export default function buildRootSaga(modules: IModule[]) {
  const moduleSagas = modules.filter(m => m.rootSaga) as Array<Required<IModule>>;

  return function*() {
    yield all(moduleSagas.map(s => fork(s.rootSaga)));
  };
}
