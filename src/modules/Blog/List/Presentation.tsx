import { Selectors } from 'modules/Blog/List';
import * as React from 'react';
import { Article } from './components/Article';

export interface IPresentationProps extends Selectors {}

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    return (
      <div>
        {this.props.articles.data.map(item => (
          <Article key={item.id} {...item} />
        ))}
      </div>
    );
  }
}
