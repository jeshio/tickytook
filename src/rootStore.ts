import buildRootReducer from './core/helpers/buildRootReducer';
import buildRootSaga from './core/helpers/buildRootSaga';
import ICModule from './core/interfaces/ICModule';
import * as Blog from './modules/Blog';
import * as Constructor from './modules/Constructor';
import * as Globals from './modules/Globals';

const modules: ICModule[] = [Constructor, Blog, Globals];

export const rootReducer = buildRootReducer(modules);

export const rootSaga = buildRootSaga(modules);
