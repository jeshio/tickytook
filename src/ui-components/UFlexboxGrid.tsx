import * as React from 'react';
import { FlexboxGrid } from 'rsuite';
import { FlexboxGridProps } from 'rsuite/types/FlexboxGrid';
import { FlexboxGridItemProps } from 'rsuite/types/FlexboxGridItem';
import styled from 'styled-components';
import { flexDirection, FlexDirectionProps, flexWrap, FlexWrapProps } from 'styled-system';

interface IUFlexboxGridProps extends FlexboxGridProps, FlexWrapProps, FlexDirectionProps {}

const Root = styled(FlexboxGrid)`
  ${flexWrap};
  ${flexDirection};
`;

const UFlexboxGrid: React.FunctionComponent<IUFlexboxGridProps> & {
  Item: React.FunctionComponent<FlexboxGridItemProps>;
} = props => {
  return <Root {...props} />;
};

UFlexboxGrid.Item = (props: FlexboxGridItemProps) => <FlexboxGrid.Item {...props} />;

UFlexboxGrid.defaultProps = {
  justify: 'space-around',
};

export default UFlexboxGrid;
