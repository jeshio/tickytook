import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticlePage from './ArticlePage';
import ArticlesListPage from './ArticlesListPage';
import Contacts from './Contacts';
import GeneratorPage from './Generator';
import NotFound from './NotFound';

export default (
  <Switch>
    <Route exact={true} path="/" component={GeneratorPage} />
    <Route exact={true} path="/articles" component={ArticlesListPage} />
    <Route exact={true} path="/articles/:slug" component={ArticlePage} />
    <Route exact={true} path="/contacts" component={Contacts} />

    <Route component={NotFound} />
  </Switch>
);
