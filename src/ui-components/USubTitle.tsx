import * as React from 'react';
import withInChildrenLoader from 'src/core/hocs/withInChildrenLoader';

interface IUSubTitleProps extends React.HTMLProps<HTMLHeadingElement> {}

const USubTitle: React.FunctionComponent<IUSubTitleProps> = props => {
  return <h2 {...props}>{props.children}</h2>;
};

export default withInChildrenLoader<IUSubTitleProps>(USubTitle);
