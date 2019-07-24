import buildModuleStore from 'src/core/helpers/buildModuleStore';
import * as Base from './Base';

const subModules = [Base];

const { reducers, rootSaga } = buildModuleStore(subModules);

export { reducers, rootSaga };

export * from './constants';
