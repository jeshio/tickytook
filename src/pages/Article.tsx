import * as React from 'react';
import Article from 'src/modules/Blog/Article';

export interface IArticlePageProps {}

export default class ArticlePage extends React.PureComponent<IArticlePageProps, any> {
  public render() {
    return (
      <div>
        <Article />
      </div>
    );
  }
}
