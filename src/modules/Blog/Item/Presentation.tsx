import { Actions, Selectors } from 'modules/Blog/List';
import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UShareButtons from 'src/ui-components/UShareButtons';
import Content from './components/Content';
import ShortDescription from './components/ShortDescription';

export interface IPresentationProps extends Actions, Selectors {}

export default class Presentation extends React.PureComponent<IPresentationProps, any> {
  public render() {
    const article = this.props.article.data;
    if (!article) {
      return null;
    }

    return (
      <UBlock marginBottom={[5, 4]}>
        <UBlock marginTop={[3, 5]} marginBottom={2}>
          <ShortDescription {...article} />
        </UBlock>

        <UBlock my={4} display="flex" alignItems="center" justifyContent="center">
          <UBlock visible={[false, true]}>Поделиться&nbsp;</UBlock>
          <UShareButtons />
        </UBlock>

        <Content markdownText={article.text} />

        <UBlock marginTop={[4, 2]} visible={String(article.text).length > 300}>
          <UShareButtons />
        </UBlock>
      </UBlock>
    );
  }
}
