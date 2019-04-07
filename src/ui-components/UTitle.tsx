import * as React from 'react';

interface IUTitleProps {}

const UTitle: React.FunctionComponent<IUTitleProps> = props => {
  return <h1>{props.children}</h1>;
};

export default UTitle;
