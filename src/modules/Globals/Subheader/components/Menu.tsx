import { MenuItem } from 'modules/Globals/Sidebar';
import * as React from 'react';
import UButton from 'src/ui-components/UButton';
import UHorizontalList from 'src/ui-components/UHorizontalList';
import UIcon from 'src/ui-components/UIcon';

interface IMenuProps {
  items: MenuItem[];
}

const itemCss = `
  margin-right: 0.5rem;
`;

const Menu: React.FunctionComponent<IMenuProps> = props => {
  const listItems = props.items.map(item => (
    <UButton
      onClick={item.onClick}
      icon={item.svg && <UIcon svg={item.svg} />}
      appearance="ghost"
      key={item.title}
    >
      {item.title}
    </UButton>
  ));
  return <UHorizontalList items={listItems} itemCss={itemCss} />;
};

export default Menu;
