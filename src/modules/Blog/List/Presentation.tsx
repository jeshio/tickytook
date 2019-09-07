import { IProps } from 'modules/Blog/List';
import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UHelmet from 'src/ui-components/UHelmet';
import USpinner from 'src/ui-components/USpinner';
import UTitle from 'src/ui-components/UTitle';
import List from './components/List';

export interface IPresentationProps extends IProps {}

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    const { selectors } = this.props;
    return (
      <div>
        <UHelmet
          title="Статьи про продвижение"
          description="Продвижение в социальных сетях через хэштеги. Читай как!"
        />
        <UTitle>Статьи</UTitle>
        <USpinner loading={selectors.articles.loading}>
          <List items={selectors.articles.data} />
        </USpinner>
        <UBlock
          visible={!selectors.articles.loading && selectors.articles.data.length === 0}
          textAlign="center"
          minHeight="6rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Статьи пишутся прямо сейчас и скоро здесь появятся
        </UBlock>
      </div>
    );
  }
}
