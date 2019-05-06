import * as React from 'react';
import styled from 'styled-components';

export interface IUSubTitleProps extends React.HTMLProps<HTMLHeadingElement> {}

const Root = styled.h2`
  font-size: 1.25rem;
`;

const USubTitle: React.FunctionComponent<IUSubTitleProps> = props => {
  return <Root {...props as any}>{props.children}</Root>;
};

export default USubTitle;
