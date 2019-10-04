import * as React from 'react';
import Item from 'src/modules/Blog/Item';

export interface IArticlePageProps {}

export default class ArticlePage extends React.PureComponent<IArticlePageProps> {
  public render() {
    return <Item />;
  }
}
