import buildRootReducer from './core/helpers/buildRootReducer';
import buildRootSaga from './core/helpers/buildRootSaga';
import IModule from './core/interfaces/IModule';
import * as Constructor from './modules/Constructor';

const modules: IModule[] = [Constructor];

export const rootReducer = buildRootReducer(modules);

export const rootSaga = buildRootSaga(modules);
