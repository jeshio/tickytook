import * as React from 'react';
import styled, { FlattenInterpolation } from 'styled-components';

export interface IUListProps extends React.ImgHTMLAttributes<HTMLUListElement> {
  items: React.ReactElement[];
  itemCss?: string | FlattenInterpolation<{}>;
}

const Root = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledItem = styled.li<any>`
  ${props => props.css}
`;

const UList: React.FunctionComponent<IUListProps> = ({ items, itemCss, ...props }) => {
  return (
    <Root {...props}>
      {items.map((item, index) => (
        <StyledItem css={itemCss} key={index}>
          {item}
        </StyledItem>
      ))}
    </Root>
  );
};

export default UList;
