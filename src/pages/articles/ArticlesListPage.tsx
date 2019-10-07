import * as React from 'react';
import List from 'src/modules/Blog/List';

export interface IArticlesListPageProps {}

export default class ArticlesListPage extends React.PureComponent<IArticlesListPageProps, any> {
  public render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}
