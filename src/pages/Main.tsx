import { darken } from 'polished';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import TTheme from 'src/core/types/TTheme';
import Content from 'src/modules/Globals/Content';
import Footer from 'src/modules/Globals/Footer';
import Header from 'src/modules/Globals/Header';
import Sidebar from 'src/modules/Globals/Sidebar';
import Subheader from 'src/modules/Globals/Subheader';
import UGrid from 'src/ui-components/UGrid';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { space } from 'styled-system';
import ArticlePage from './Article';
import GeneratorPage from './Generator';

const GlobalStyle = createGlobalStyle<any>`
  body {
    background-color: ${props => (props.theme as TTheme).designColors.background};
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
    min-width: 320px;
  }

  h1, h2, h3, h4 {
    font-family: Franklin Gothic;
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

// TODO добавить закрывашку сайдбара, при смене роута
export default () => (
  <Root px={[0, 2, 2]}>
    <Header />

    <Subheader />

    <Sidebar />

    <Content>
      <Route exact={true} path="/" component={GeneratorPage} />
      <Route exact={true} path="/article" component={ArticlePage} />
    </Content>

    <Footer />
    <GlobalStyle />
  </Root>
);
