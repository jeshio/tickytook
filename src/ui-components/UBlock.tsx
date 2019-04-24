import * as React from 'react';
import styled from 'styled-components';
import {
  alignItems,
  AlignItemsProps,
  display,
  DisplayProps,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  justifyContent,
  JustifyContentProps,
  justifyItems,
  JustifyItemsProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system';

interface IUBlockProps
  extends SpaceProps,
    FlexProps,
    FlexDirectionProps,
    JustifyItemsProps,
    JustifyContentProps,
    DisplayProps,
    AlignItemsProps,
    TextAlignProps {
  visible?: boolean;
}

const Root = styled.div`
  ${(props: IUBlockProps) => (props.visible ? display(props) : 'display: none')};
  ${space}
  ${textAlign}
  ${alignItems}
  ${flexDirection}
  ${justifyContent}
  ${justifyItems}
  ${flexWrap}
  ${flex}
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
