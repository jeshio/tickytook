import { combineReducers } from 'redux';
import IModule from '../interfaces/IModule';

export default function buildRootReducer(modules: IModule[]) {
  const moduleReducers = modules.reduce(
    (base, m) => ({ ...base, [m.MODULE_NAME]: m.reducers }),
    {}
  );
  return combineReducers(moduleReducers);
}
