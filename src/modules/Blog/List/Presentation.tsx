import { Selectors } from 'modules/Blog/List';
import * as React from 'react';
import UTitle from 'src/ui-components/UTitle';
import List from './components/List';

export interface IPresentationProps extends Selectors {}

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    return (
      <div>
        <UTitle>Статьи</UTitle>
        <List items={this.props.articles.data} />
      </div>
    );
  }
}
