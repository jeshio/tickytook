import raw from 'raw.macro';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
const markdown = raw('../../../mocks/articles/test.md');

export interface IPresentationProps {}

export default class Presentation extends React.PureComponent<IPresentationProps, any> {
  public render() {
    return (
      <div>
        article
        <br />
        {<ReactMarkdown source={markdown} />}
      </div>
    );
  }
}
