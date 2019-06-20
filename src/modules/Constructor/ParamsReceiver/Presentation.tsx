import React, { Component } from 'react';
import { ReactComponent as NewSpellIconComponent } from 'src/images/components/icons/reset.svg';
import LogoIcon from 'src/images/logo-icon.svg';
import LogoSm from 'src/images/logo-sm.svg';
import Logo from 'src/images/logo.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UGrid from 'src/ui-components/UGrid';
import UIcon from 'src/ui-components/UIcon';
import UIconButton from 'src/ui-components/UIconButton';
import { UImage } from 'src/ui-components/UImage';
import UInline from 'src/ui-components/UInline';
import Params from './components/Params';
import TextReceiver from './components/TextReceiver';
import { IActions, ISelectors } from './store';

export interface IPresentationProps extends ISelectors, IActions {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    const { text, changeText } = this.props;
    return (
      <UBlock marginBottom={[3]}>
        <UBlock my={[2]}>
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
              <UInline visible={[false, true]}>
                <UImage
                  src={Logo}
                  width={['18rem', '21rem']}
                  alt="Tickytook.ru - генератор хэштегов"
                />
              </UInline>
              <UInline visible={[true, false]}>
                <UImage
                  src={LogoSm}
                  width={['12rem', '14rem', '16rem']}
                  alt="Tickytook.ru - генератор хэштегов"
                />
              </UInline>
            </UBlock>
            <UBlock my={0} textAlign="right" visible={[false, false, true]}>
              <UButton
                appearance="ghost"
                onClick={this.props.reset}
                icon={<UIcon svg={NewSpellIconComponent} />}
              >
                Новое заклятие
              </UButton>
            </UBlock>
            <UBlock my={0} textAlign="right" visible={[true, true, false]}>
              <UIconButton
                appearance="ghost"
                onClick={this.props.reset}
                svg={NewSpellIconComponent}
              />
            </UBlock>
          </UBlock>
        </UBlock>
        <UGrid.Row>
          <UGrid.Col md={24}>
            <TextReceiver
              value={text}
              onChange={changeText}
              onFormSubmit={this.props.wiz}
              isExtendedMode={this.props.isExtendedMode}
            />
          </UGrid.Col>
        </UGrid.Row>
        <UGrid.Row>
          <UGrid.Col md={24}>
            <Params {...this.props} />
          </UGrid.Col>
        </UGrid.Row>
      </UBlock>
    );
  }
}
