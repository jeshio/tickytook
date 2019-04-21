import buildRootReducer from './core/helpers/buildRootReducer';
import buildRootSaga from './core/helpers/buildRootSaga';
import ICModule from './core/interfaces/ICModule';
import * as Constructor from './modules/Constructor';

const modules: ICModule[] = [Constructor];

export const rootReducer = buildRootReducer(modules);

export const rootSaga = buildRootSaga(modules);
