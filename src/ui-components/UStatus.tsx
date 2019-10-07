import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';

interface IUStatusProps extends React.PropsWithChildren<{}> {
  code: number;
}

const routeRender = ({ children, code }: IUStatusProps) => ({
  staticContext,
}: RouteComponentProps<any>) => {
  if (staticContext) {
    staticContext.statusCode = code;
  }
  return children;
};

const UStatus: React.FunctionComponent<IUStatusProps> = props => {
  return <Route render={routeRender(props)} />;
};

export default UStatus;
