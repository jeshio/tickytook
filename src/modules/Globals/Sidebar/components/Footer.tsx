import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import styled from 'styled-components';

interface IFooterProps {
  onCloseClick: () => void;
}

const Root = styled(UBlock)`
  position: relative;
  width: 100%;
`;

const Button = styled(UButton)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 0;
  background-color: #b66;
  color: #fff;
`;

const Footer: React.FunctionComponent<IFooterProps> = props => {
  return (
    <Root py={6} textAlign="center">
      <Button appearance="danger" onClick={props.onCloseClick}>
        Закрыть
      </Button>
    </Root>
  );
};

export default Footer;
