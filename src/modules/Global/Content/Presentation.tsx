import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';

interface IPresentationProps extends React.PropsWithChildren<{}> {}

const Root = styled(UBlock)`
  min-height: 14rem;
`;

const Presentation: React.FunctionComponent<IPresentationProps> = props => {
  return <Root>{props.children}</Root>;
};

export default Presentation;
