import { combineReducers } from 'redux';
import ICModule from '../interfaces/ICModule';

export default function buildRootReducer(modules: ICModule[]) {
  const moduleReducers = modules.reduce(
    (base, m) => ({ ...base, [m.MODULE_NAME]: m.reducers }),
    {}
  );
  return combineReducers(moduleReducers);
}
