import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticlePage from './articles/ArticlePage';
import ArticlesListPage from './articles/ArticlesListPage';
import Contacts from './Contacts';
import GeneratorPage from './Generator';
import NotFound from './NotFound';

/**
 * Здесь все роуты
 * Каждый из них попадёт в site-map
 */
export default (
  <Switch>
    <Route exact={true} path="/" component={GeneratorPage} />
    <Route exact={true} path="/articles" component={ArticlesListPage} />
    <Route exact={true} path="/articles/:slug" component={ArticlePage} />
    <Route exact={true} path="/contacts" component={Contacts} />

    <Route component={NotFound} />
  </Switch>
);
