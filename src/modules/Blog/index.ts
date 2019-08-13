import buildModuleStore from 'src/core/helpers/buildModuleStore';
import * as List from './List';

const subModules = [List];

const { reducers, rootSaga } = buildModuleStore(subModules);

export { reducers, rootSaga };

export * from './constants';
