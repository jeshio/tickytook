import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { DeepRequired } from 'utility-types';
import ICSubModule from '../interfaces/ICSubModule';

export default function buildModuleStore(subModules: ICSubModule[]) {
  const subModuleReducers = subModules.reduce(
    (base, m) => (m && m.Store ? { ...base, [m.SUB_MODULE_NAME]: m.Store.reducers } : base),
    {}
  );
  const reducers = combineReducers(subModuleReducers);

  const subModuleSagas = subModules.filter(m => m.Store && m.Store.rootSaga) as Array<
    DeepRequired<ICSubModule>
  >;

  const rootSaga = function*() {
    yield all(subModuleSagas.map(s => fork(s.Store.rootSaga)));
  };

  return {
    reducers,
    rootSaga,
  };
}
