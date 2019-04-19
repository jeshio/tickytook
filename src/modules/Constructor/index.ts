import buildModuleStore from 'src/core/helpers/buildModuleStore';
import * as Conclusion from './Conclusion';
import * as ParamsReceiver from './ParamsReceiver';

const subModules = [ParamsReceiver, Conclusion];

const { reducers, rootSaga } = buildModuleStore(subModules);

export { reducers, rootSaga };

export * from './constants';
