import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from 'src/images/logo-icon.svg';
import LogoSm from 'src/images/logo-sm.svg';
import UBlock from 'src/ui-components/UBlock';
import { UImage } from 'src/ui-components/UImage';
import UInline from 'src/ui-components/UInline';

interface IHeaderProps {
  switchSidebar: () => void;
}

const Header: React.FunctionComponent<IHeaderProps> = props => {
  return (
    <Link to="/" onClick={props.switchSidebar}>
      <UBlock p={2} py={4}>
        <UImage src={LogoIcon} width={'2rem'} alt="Волшебник Тикитук" />
        <UInline marginLeft={2}>
          <UImage src={LogoSm} width={'10rem'} alt="Tickytook.ru - генератор хэштегов" />
        </UInline>
      </UBlock>
    </Link>
  );
};

export default Header;
