import { Actions, Selectors } from 'modules/Blog/List';
import raw from 'raw.macro';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { UImage } from 'src/ui-components/UImage';
const markdown = raw('../../../mocks/articles/test.md');

export interface IPresentationProps extends Actions, Selectors {}

export default class Presentation extends React.PureComponent<IPresentationProps, any> {
  public render() {
    const article = this.props.article.data;
    if (!article) {
      return null;
    }

    return (
      <div>
        <UImage src={article.logo.url} alt={article.logo.title} height="180px" />
        <h1>{article.title}</h1>
        {<ReactMarkdown source={article.text} />}
      </div>
    );
  }
}
