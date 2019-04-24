import * as React from 'react';

interface IUTitleProps extends React.HTMLProps<HTMLHeadingElement> {}

const UTitle: React.FunctionComponent<IUTitleProps> = props => {
  return <h1 {...props}>{props.children}</h1>;
};

export default UTitle;
