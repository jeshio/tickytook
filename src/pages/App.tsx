import React from 'react';
import TTheme from 'src/core/types/TTheme';
import Conclusion from 'src/modules/Constructor/Conclusion';
import ParamsReceiver from 'src/modules/Constructor/ParamsReceiver';
import Footer from 'src/modules/Globals/Footer';
import UBlock from 'src/ui-components/UBlock';
import UGrid from 'src/ui-components/UGrid';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { space } from 'styled-system';

const GlobalStyle = createGlobalStyle<any>`
  body {
    background-color: ${props => (props.theme as TTheme).designColors.background};
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
  }

  h1, h2, h3, h4 {
    font-family: Franklin Gothic;
  }

  a {
    color: ${props => (props.theme as TTheme).designColors.link};
  }
`;

const Root = styled(UGrid)`
  ${space};
`;

export default () => (
  <Root px={[0, 0, 2]}>
    <UBlock px={[2, 2, 0]}>
      <ParamsReceiver />
    </UBlock>
    <Conclusion />
    <Footer />
    <GlobalStyle />
  </Root>
);
