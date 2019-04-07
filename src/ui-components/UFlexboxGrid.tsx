import * as React from 'react';
import { FlexboxGrid } from 'rsuite';
import { FlexboxGridProps } from 'rsuite/types/FlexboxGrid';
import { FlexboxGridItemProps } from 'rsuite/types/FlexboxGridItem';

interface IUFlexboxGridProps extends FlexboxGridProps {}

const UFlexboxGrid: React.FunctionComponent<IUFlexboxGridProps> & {
  Item: React.FunctionComponent<FlexboxGridItemProps>;
} = props => {
  return <FlexboxGrid {...props} />;
};

UFlexboxGrid.Item = (props: FlexboxGridItemProps) => <FlexboxGrid.Item {...props} />;

UFlexboxGrid.defaultProps = {
  justify: 'space-around',
};

export default UFlexboxGrid;
