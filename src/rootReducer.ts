import { combineReducers } from 'redux';
import * as Constructor from 'src/modules/Constructor';

export default () =>
  combineReducers({
    [Constructor.MODULE_NAME]: Constructor.reducers,
  });
