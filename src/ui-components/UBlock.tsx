import * as React from 'react';
import displayWithVisibleChecking from 'src/core/extends/styled-system/displayWithVisibleChecking';
import { VisibleProps } from 'src/core/extends/styled-system/interfaces';
import styled from 'styled-components';
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
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  overflow,
  OverflowProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system';

export interface IUBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
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
    MinWidthProps,
    MaxHeightProps,
    BackgroundColorProps,
    MinHeightProps,
    PositionProps,
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
  ${minWidth};
  ${maxHeight};
  ${minHeight};
  ${backgroundColor};
  ${position};
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
