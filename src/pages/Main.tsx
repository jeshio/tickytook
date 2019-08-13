import { darken } from 'polished';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import TTheme from 'src/core/types/TTheme';
import Content from 'src/modules/Globals/Content';
import Footer from 'src/modules/Globals/Footer';
import Header from 'src/modules/Globals/Header';
import Sidebar from 'src/modules/Globals/Sidebar';
import Subheader from 'src/modules/Globals/Subheader';
import UGrid from 'src/ui-components/UGrid';
import UHelmet from 'src/ui-components/UHelmet';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { space } from 'styled-system';
import ArticlePage from './ArticlePage';
import ArticlesListPage from './ArticlesListPage';
import Contacts from './Contacts';
import GeneratorPage from './Generator';
import NotFound from './NotFound';

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

// TODO добавить 404
export default () => (
  <Root px={[0, 2, 2]}>
    <UHelmet />
    <Header />

    <Subheader />

    <Sidebar />

    <Content>
      <Switch>
        <Route exact={true} path="/" component={GeneratorPage} />
        <Route exact={true} path="/articles" component={ArticlesListPage} />
        <Route exact={true} path="/articles/:slug" component={ArticlePage} />
        <Route exact={true} path="/contacts" component={Contacts} />

        <Route component={NotFound} />
      </Switch>
    </Content>

    <Footer />
    <GlobalStyle />
  </Root>
);
