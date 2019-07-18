import * as React from 'react';
import LogoIcon from 'src/images/logo-icon.svg';
import LogoSm from 'src/images/logo-sm.svg';
import Logo from 'src/images/logo.svg';
import UBlock from 'src/ui-components/UBlock';
import { UImage } from 'src/ui-components/UImage';
import UInline from 'src/ui-components/UInline';
import styled from 'styled-components';

export interface IPresentationProps {}

const Root = styled(UBlock)`
  position: relative;

  &::after {
    content: '';
    background-color: #ece2c2;
    position: absolute;
    bottom: -7px;
    left: 0;
    width: 100%;
    height: 7px;
    border-radius: 5px;
  }
`;

export default class Presentation extends React.Component<IPresentationProps, any> {
  public render() {
    return (
      <Root marginBottom={4} p={2}>
        <UBlock
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <UBlock mx={[1]} my={0}>
            <UInline mr={2}>
              <UImage src={LogoIcon} width={['3rem']} alt="Волшебник Тикитук" />
            </UInline>
            <UInline visible={[false, false, true]}>
              <UImage
                src={Logo}
                width={['18rem', '21rem']}
                alt="Tickytook.ru - генератор хэштегов"
              />
            </UInline>
            <UInline visible={[true, true, false]}>
              <UImage
                src={LogoSm}
                width={['12rem', '14rem', '16rem']}
                alt="Tickytook.ru - генератор хэштегов"
              />
            </UInline>
          </UBlock>
        </UBlock>
      </Root>
    );
  }
}
