import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';

interface IPresentationProps {}

const Root = styled(UBlock)`
  background-color: #fff;
`;

const Presentation: React.FunctionComponent<IPresentationProps> = props => {
  return (
    <Root textAlign="center" py={4} borderRadius={[0, '5px']}>
      © 2019 Все права защищены,{' '}
      <a href="https://www.instagram.com/ga_ivanov/" target="_blank">
        @jeshio
      </a>
    </Root>
  );
};

export default Presentation;
