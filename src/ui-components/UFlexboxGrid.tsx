import * as React from 'react';
import { FlexboxGrid } from 'rsuite';
import { FlexboxGridProps } from 'rsuite/types/FlexboxGrid';
import { FlexboxGridItemProps } from 'rsuite/types/FlexboxGridItem';
import styled from 'styled-components';
import {
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  FlexWrapProps,
} from 'styled-system';

interface IUFlexboxGridProps extends FlexboxGridProps, FlexWrapProps, FlexDirectionProps {}

interface IUFlexboxGridItemProps extends FlexboxGridItemProps, FlexProps {}

const StyledUFlexboxGrid = styled(({ flexWrap: a, flexDirection: b, ...props }) => (
  <FlexboxGrid {...props} />
))`
  ${flexWrap};
  ${flexDirection};
`;

const StyledItem = styled(FlexboxGrid.Item)`
  ${flex};
`;

const UFlexboxGrid: React.FunctionComponent<IUFlexboxGridProps> & {
  Item: React.FunctionComponent<IUFlexboxGridItemProps>;
} = props => {
  return <StyledUFlexboxGrid {...props} />;
};

UFlexboxGrid.Item = (props: IUFlexboxGridItemProps) => <StyledItem {...props} />;

UFlexboxGrid.defaultProps = {
  justify: 'space-around',
};

export default UFlexboxGrid;
