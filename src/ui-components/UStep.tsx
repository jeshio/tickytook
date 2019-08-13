import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';

interface IUStepProps extends React.PropsWithChildren<{}> {}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: ${props => (props.theme as TTheme).colors.lightRed};
  color: #fff;
  font-size: 28px;
  font-family: Microsoft YaHei, sans-serif;
`;

const UStep: React.FunctionComponent<IUStepProps> = props => {
  return <Root {...props}>{props.children}</Root>;
};

export default UStep;
