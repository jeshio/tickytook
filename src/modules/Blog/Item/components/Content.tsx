import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';

interface IContentProps {
  markdownText?: string;
}

const Root = styled(UBlock)`
  background-color: #fff;

  h1,
  h2,
  h3,
  h4 {
    &:first-child {
      margin-top: 0;
    }
  }
`;

const Content: React.FunctionComponent<IContentProps> = props => {
  return (
    <Root p={[4, 4, 5]} py={[5, 5, 6]} borderRadius={[0, '5px']}>
      <ReactMarkdown source={props.markdownText} />
    </Root>
  );
};

export default Content;
