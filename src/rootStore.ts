import buildRootReducer from './core/helpers/buildRootReducer';
import buildRootSaga from './core/helpers/buildRootSaga';
import ICModule from './core/interfaces/ICModule';
import * as Constructor from './modules/Constructor';
import * as Globals from './modules/Globals';

const modules: ICModule[] = [Constructor, Globals];

export const rootReducer = buildRootReducer(modules);

export const rootSaga = buildRootSaga(modules);
