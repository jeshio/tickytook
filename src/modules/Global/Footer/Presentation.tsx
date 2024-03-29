import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';

interface IPresentationProps {}

const Root = styled(UBlock)`
  background-color: #fff;
`;

const Presentation: React.FunctionComponent<IPresentationProps> = props => {
  return (
    <Root textAlign="center" marginTop={[2, 4, 5]} py={4} borderRadius={[0, '5px']}>
      © 2019 Все права защищены,{' '}
      <a href="https://www.instagram.com/jeshio.ru/" target="_blank">
        @jeshio
      </a>
      ,{' '}
      <a href="/policy" target="_blank">
        пользовательское соглашение
      </a>
    </Root>
  );
};

export default Presentation;
