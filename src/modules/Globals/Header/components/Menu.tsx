import { MenuItem } from 'modules/Globals/Sidebar';
import * as React from 'react';
import { Link } from 'react-router-dom';
import UHorizontalList from 'src/ui-components/UHorizontalList';
import styled from 'styled-components';

interface IMenuProps {
  items: MenuItem[];
}

const itemCss = `
  border-right: 1px solid #aaa;

  &:last-of-type {
    border: unset;
  }
`;

const StyledLink = styled(Link)`
  padding: 1rem 1.5rem;
`;

const Menu: React.FunctionComponent<IMenuProps> = props => {
  const listItems = props.items.map(item => (
    <StyledLink to={item.link || ''} key={item.title}>
      {item.title}
    </StyledLink>
  ));
  return <UHorizontalList items={listItems} itemCss={itemCss} />;
};

export default Menu;
