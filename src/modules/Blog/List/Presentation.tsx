import { Selectors } from 'modules/Blog/List';
import * as React from 'react';
import UHelmet from 'src/ui-components/UHelmet';
import USpinner from 'src/ui-components/USpinner';
import UTitle from 'src/ui-components/UTitle';
import List from './components/List';

export interface IPresentationProps extends Selectors {}

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    return (
      <div>
        <UHelmet
          title="Статьи про продвижение"
          description="Продвижение в социальных сетях через хэштеги. Читай как!"
        />
        <UTitle>Статьи</UTitle>
        <USpinner loading={this.props.articles.loading}>
          <List items={this.props.articles.data} />
        </USpinner>
      </div>
    );
  }
}
