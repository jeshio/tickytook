import React from 'react';
import { Link, Route } from 'react-router-dom';
import TTheme from 'src/core/types/TTheme';
import Content from 'src/modules/Globals/Content';
import Footer from 'src/modules/Globals/Footer';
import Header from 'src/modules/Globals/Header';
import UBlock from 'src/ui-components/UBlock';
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
  }
`;

const Root = styled(UGrid)`
  ${space};
`;

export default () => (
  <Root px={[0, 2, 2]}>
    <UBlock px={[2, 0, 0]}>
      <Header />
    </UBlock>

    <Content>
      <Route exact={true} path="/" component={GeneratorPage} />
      <Route exact={true} path="/article" component={ArticlePage} />
    </Content>

    <Footer />
    <GlobalStyle />
  </Root>
);
