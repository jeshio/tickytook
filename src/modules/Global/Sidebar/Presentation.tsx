import * as React from 'react';
import { Store as GlobalStore } from 'src/modules/Global';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';

export interface IPresentationProps extends GlobalStore.ISelectors {
  switchSidebar: () => void;
}

const Root = styled(UBlock)<any>`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  z-index: 1000;
  background-color: #fff;
  top: 0;
  bottom: 0;
  transition: right 0.3s;
  width: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Layout = styled.div<any>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.3s;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  cursor: pointer;
`;

const Content = styled(UBlock)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    const {
      sidebarIsOpen,
      sidebarMainMenuItems,
      sidebarExtraMenuItems,
      switchSidebar,
    } = this.props;

    return (
      <UBlock visible={[true, true, false]}>
        <Layout isOpen={sidebarIsOpen} onClick={switchSidebar} />
        <Root isOpen={sidebarIsOpen}>
          <Header switchSidebar={switchSidebar} />
          <Menu items={sidebarMainMenuItems} switchSidebar={switchSidebar} />

          <Content>
            <Menu items={sidebarExtraMenuItems} switchSidebar={switchSidebar} />
          </Content>
          <Footer onCloseClick={switchSidebar} />
        </Root>
      </UBlock>
    );
  }
}
