import * as React from 'react';
import { Col, Grid, Row } from 'rsuite';
import { ColProps } from 'rsuite/lib/Col';
import { GridProps } from 'rsuite/lib/Grid';
import { RowProps } from 'rsuite/lib/Row';

interface IUGridProps extends GridProps {}

type TUGrid = React.FunctionComponent<IUGridProps> & {
  Row: React.ComponentType<RowProps>;
  Col: React.ComponentType<ColProps>;
};

const UGrid: TUGrid = props => {
  return <Grid {...props} />;
};

UGrid.Row = (props: RowProps) => <Row {...props} />;
UGrid.Col = (props: ColProps) => <Col {...props} />;

export default UGrid;
