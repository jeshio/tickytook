import { combineReducers } from 'redux';
import * as ParamsReceiver from './ParamsReceiver';

export default combineReducers({
  [ParamsReceiver.SUB_MODULE_NAME]: ParamsReceiver.Store.reducers,
});
