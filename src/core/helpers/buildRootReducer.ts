import { combineReducers } from 'redux';
import ICModule from '../interfaces/ICModule';

export default function buildRootReducer(modules: ICModule[]) {
  const moduleReducers = modules.reduce(
    (base, m) => (m.Store ? { ...base, [m.MODULE_NAME]: m.Store.reducers } : base),
    {}
  );
  return combineReducers(moduleReducers);
}
