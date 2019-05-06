import React, { Component } from 'react';
import { ReactComponent as NewSpellIconComponent } from 'src/images/icons/reset.svg';
import Logo from 'src/images/logo.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UGrid from 'src/ui-components/UGrid';
import UIcon from 'src/ui-components/UIcon';
import UIconButton from 'src/ui-components/UIconButton';
import { UImage } from 'src/ui-components/UImage';
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
              <UImage src={Logo} width={['18rem', '21rem']} />
            </UBlock>
            <UBlock my={0} textAlign="right" visible={[false, true]}>
              <UButton
                appearance="ghost"
                onClick={this.props.reset}
                icon={<UIcon svg={NewSpellIconComponent} />}
              >
                Новое заклятие
              </UButton>
            </UBlock>
            <UBlock my={0} textAlign="right" visible={[true, false]}>
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
            <TextReceiver value={text} onChange={changeText} />
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
