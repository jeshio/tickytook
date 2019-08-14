import { MenuItem } from 'modules/Globals/Sidebar';
import * as React from 'react';
import { Link } from 'react-router-dom';
import UButton from 'src/ui-components/UButton';
import UList from 'src/ui-components/UList';
import styled from 'styled-components';

interface IMenuProps {
  items: MenuItem[];
  switchSidebar: () => void;
}

const Root = styled(UList)`
  width: 100%;
  border-top: 1px solid #e5e5e5;

  a,
  .rs-btn-link {
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
`;

const ItemLink = styled(Link)`
  display: block;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
`;

const ItemButton = styled(UButton)`
  &.u-override {
    display: block;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 0;
    width: 100%;
    text-align: left;
  }
`;

const Menu: React.FunctionComponent<IMenuProps> = props => {
  if (props.items.length === 0) {
    return null;
  }

  const clickHandler = (callback = () => {}) => () => {
    callback();
    props.switchSidebar();
  };

  return (
    <Root
      items={props.items.map(item =>
        item.link ? (
          <ItemLink to={item.link} key={item.link} onClick={clickHandler(item.onClick)}>
            {item.title}
          </ItemLink>
        ) : (
          <ItemButton onClick={clickHandler(item.onClick)} appearance="link">
            {item.title}
          </ItemButton>
        )
      )}
    />
  );
};

export default Menu;
