import * as React from 'react';
import styled from 'styled-components';
import * as cssType from 'styled-components/cssprop';
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

export interface IUBlockProps
  extends SpaceProps,
    FlexProps,
    FlexDirectionProps,
    JustifyItemsProps,
    JustifyContentProps,
    DisplayProps,
    AlignItemsProps,
    TextAlignProps {
  visible?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
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
  ${props => props.css}
`;

const UBlock: React.FunctionComponent<IUBlockProps> = React.forwardRef<
  HTMLDivElement,
  IUBlockProps
>((props, ref) => {
  return (
    <Root {...props} ref={ref as any}>
      {props.children}
    </Root>
  );
});

UBlock.defaultProps = {
  display: 'block',
  my: [1, 1, 2],
  visible: true,
};

export default UBlock;
