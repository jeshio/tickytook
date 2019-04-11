import * as React from 'react';

interface IUHashTagProps {}

const UHashTag: React.FunctionComponent<IUHashTagProps> = props => {
  const { children } = props;
  return <span>{children}</span>;
};

export default UHashTag;
