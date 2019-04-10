import { combineReducers } from 'redux';
import * as Conclusion from './Conclusion';
import * as ParamsReceiver from './ParamsReceiver';

export default combineReducers({
  [ParamsReceiver.SUB_MODULE_NAME]: ParamsReceiver.Store.reducers,
  [Conclusion.SUB_MODULE_NAME]: Conclusion.Store.reducers,
});
