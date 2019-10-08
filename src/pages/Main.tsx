import { darken } from 'polished';
import React from 'react';
import TTheme from 'src/core/types/TTheme';
import Content from 'src/modules/Global/Content';
import CookiesNotice from 'src/modules/Global/CookiesNotice';
import Footer from 'src/modules/Global/Footer';
import Header from 'src/modules/Global/Header';
import Sidebar from 'src/modules/Global/Sidebar';
import Subheader from 'src/modules/Global/Subheader';
import UGrid from 'src/ui-components/UGrid';
import UHelmet from 'src/ui-components/UHelmet';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { space } from 'styled-system';
import router from './router';

const GlobalStyle = createGlobalStyle<any>`
  body {
    background-color: ${props => (props.theme as TTheme).designColors.background};
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
    min-width: 320px;
  }

  h1, h2, h3, h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  a {
    color: ${props => (props.theme as TTheme).designColors.link};
    transition: 0.25s color;
    
    &:focus, &:hover {
      color: ${props => darken(0.07, (props.theme as TTheme).designColors.link)};
      text-decoration: none;
    }
  }
`;

const Root = styled(UGrid)`
  ${space};
  overflow: hidden;
  position: relative;
  height: 100%;
`;

export default () => (
  <>
    <Root px={[0, 2, 2]}>
      <UHelmet />
      <Header />

      <Subheader />

      <Sidebar />

      <Content>{router}</Content>

      <Footer />

      <GlobalStyle />
    </Root>
    <CookiesNotice />
  </>
);
