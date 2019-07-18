import * as React from 'react';
import styled from 'styled-components';
import UBlock from './UBlock';

export interface IUSubHeaderProps extends React.PropsWithChildren<{}> {}

const Root = styled(UBlock)``;

const USubHeader: React.FunctionComponent<IUSubHeaderProps> = props => {
  return (
    <Root marginTop={2} marginBottom={3}>
      {props.children}
    </Root>
  );
};

export default USubHeader;
