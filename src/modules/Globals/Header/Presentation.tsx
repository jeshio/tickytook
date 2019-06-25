import * as React from 'react';
import { ReactComponent as NewSpellIconComponent } from 'src/images/components/icons/reset.svg';
import LogoIcon from 'src/images/logo-icon.svg';
import LogoSm from 'src/images/logo-sm.svg';
import Logo from 'src/images/logo.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UIcon from 'src/ui-components/UIcon';
import UIconButton from 'src/ui-components/UIconButton';
import { UImage } from 'src/ui-components/UImage';
import UInline from 'src/ui-components/UInline';

export interface IPresentationProps {
  reset: () => void;
  isExtendedMode: boolean;
  switchMode: () => void;
}

export default class Presentation extends React.Component<IPresentationProps, any> {
  public render() {
    return (
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
          <UBlock my={0} textAlign="right" visible={[false, false, true]}>
            <UButton onClick={this.props.switchMode} appearance="link" py={0}>
              {this.props.isExtendedMode ? 'Простой режим' : 'Расширенный режим'}
            </UButton>
            <UButton
              appearance="ghost"
              onClick={this.props.reset}
              icon={<UIcon svg={NewSpellIconComponent} />}
            >
              Новое заклятие
            </UButton>
          </UBlock>
          <UBlock my={0} textAlign="right" visible={[true, true, false]}>
            <UInline visible={[false, true]}>
              <UButton onClick={this.props.switchMode} appearance="link" py={0}>
                {this.props.isExtendedMode ? 'Упростить' : 'Расширить'}
              </UButton>
            </UInline>
            <UIconButton
              appearance="ghost"
              onClick={this.props.reset}
              svg={NewSpellIconComponent}
            />
          </UBlock>
        </UBlock>
      </UBlock>
    );
  }
}
