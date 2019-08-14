import * as React from 'react';
import styled from 'styled-components';
import UList, { IUListProps } from './UList';

interface IUHorizontalListProps extends IUListProps {}

const Root = styled(UList)`
  display: flex;
  list-style-type: none;
  list-style-position: unset;
  margin: 0;
  padding: 0;
`;

const UHorizontalList: React.FunctionComponent<IUHorizontalListProps> = props => {
  return <Root {...props} />;
};

export default UHorizontalList;
