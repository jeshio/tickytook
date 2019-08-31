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
    margin-top: 1.2rem;
    margin-bottom: 1rem;
    font-size: 140%;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    text-align: justify;
  }

  ul,
  ol {
    margin: 1rem 0;
  }
`;

const Content: React.FunctionComponent<IContentProps> = props => {
  return (
    <Root p={[4, 6, 8]} py={[5, 6, 8]} mx={[0, 2, 4]} borderRadius={[0, '5px']}>
      <ReactMarkdown source={props.markdownText} />
    </Root>
  );
};

export default Content;
