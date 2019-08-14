import * as React from 'react';
import displayWithVisibleChecking from 'src/core/extends/styled-system/displayWithVisibleChecking';
import { VisibleProps } from 'src/core/extends/styled-system/interfaces';
import styled from 'styled-components';
import * as cssType from 'styled-components/cssprop';
import {
  alignItems,
  AlignItemsProps,
  backgroundColor,
  BackgroundColorProps,
  borderRadius,
  BorderRadiusProps,
  DisplayProps,
  flex,
  flexBasis,
  FlexBasisProps,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  FlexWrapProps,
  justifyContent,
  JustifyContentProps,
  justifyItems,
  JustifyItemsProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  overflow,
  OverflowProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system';

export interface IUBlockProps
  extends React.ImgHTMLAttributes<HTMLDivElement>,
    SpaceProps,
    FlexProps,
    FlexDirectionProps,
    FlexWrapProps,
    JustifyItemsProps,
    JustifyContentProps,
    DisplayProps,
    AlignItemsProps,
    TextAlignProps,
    FlexBasisProps,
    BorderRadiusProps,
    OverflowProps,
    MaxWidthProps,
    BackgroundColorProps,
    MinHeightProps,
    VisibleProps {
  ref?: React.RefObject<HTMLDivElement>;
}

const Root = styled.div<any>`
  ${displayWithVisibleChecking};
  ${space}
  ${textAlign}
  ${alignItems}
  ${flexDirection}
  ${justifyContent}
  ${justifyItems}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${borderRadius};
  ${overflow};
  ${maxWidth};
  ${minHeight};
  ${backgroundColor};
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
  visible: true,
};

export default UBlock;
