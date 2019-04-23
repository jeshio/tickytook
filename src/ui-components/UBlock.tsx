import * as React from 'react';
import styled from 'styled-components';
import { space, SpaceProps, textAlign, TextAlignProps } from 'styled-system';

interface IUBlockProps extends SpaceProps, TextAlignProps {
  display?: 'block' | 'inline' | 'inline-block';
  visible?: boolean;
}

const Root = styled.div`
  display: ${(props: IUBlockProps) => (props.visible ? props.display : 'none')};
  ${space}
  ${textAlign}
`;

const UBlock: React.FunctionComponent<IUBlockProps> = props => {
  return <Root {...props}>{props.children}</Root>;
};

UBlock.defaultProps = {
  display: 'block',
  my: [1, 1, 2],
  visible: true,
};

export default UBlock;
