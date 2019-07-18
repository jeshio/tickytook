import * as React from 'react';
import styled, { FlattenInterpolation } from 'styled-components';

export interface IUListProps extends React.ImgHTMLAttributes<HTMLUListElement> {
  items: React.ReactElement[];
  itemCss?: string | FlattenInterpolation<{}>;
}

const StyledItem = styled.li<any>`
  ${props => props.css}
`;

const UList: React.FunctionComponent<IUListProps> = ({ items, itemCss, ...props }) => {
  return (
    <ul {...props}>
      {items.map((item, index) => (
        <StyledItem css={itemCss} key={index}>
          {item}
        </StyledItem>
      ))}
    </ul>
  );
};

export default UList;
