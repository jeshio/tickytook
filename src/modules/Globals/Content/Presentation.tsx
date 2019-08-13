import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';

interface IPresentationProps extends React.PropsWithChildren<{}> {}

const Root = styled(UBlock)`
  background-color: #fff;
`;

const Presentation: React.FunctionComponent<IPresentationProps> = props => {
  return <div>{props.children}</div>;
};

export default Presentation;
