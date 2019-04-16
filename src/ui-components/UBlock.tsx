import * as React from 'react';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

interface IUBlockProps extends SpaceProps {
  display?: 'block' | 'inline' | 'inline-block';
}

const Root = styled.div`
  display: ${(props: IUBlockProps) => props.display};
  ${space}
`;

const UBlock: React.FunctionComponent<IUBlockProps> = props => {
  return <Root {...props}>{props.children}</Root>;
};

UBlock.defaultProps = {
  display: 'block',
  my: [1, 1, 2],
};

export default UBlock;
