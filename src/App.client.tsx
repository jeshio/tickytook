import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import getStore from './store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: object;
  }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__ || {};

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

export default () => (
  <Router>
    <App store={getStore(preloadedState)} />
  </Router>
);
