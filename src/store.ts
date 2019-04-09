import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => never;
  }
}

const initialState = {};
const enhancers = [] as Array<() => void>;
const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || {};

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  const logger = createLogger();
  middlewares.push(logger);
}

const composedEnhancers: StoreEnhancer<{}, {}> = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(rootReducer(), initialState, composedEnhancers);

export default store;
