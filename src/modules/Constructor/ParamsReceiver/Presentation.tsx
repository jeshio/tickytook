import React, { Component } from 'react';
import NewSpellIcon from 'src/images/icons/magic-wand.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UGrid from 'src/ui-components/UGrid';
import UTitle from 'src/ui-components/UTitle';
import Params from './components/Params';
import TextReceiver from './components/TextReceiver';
import { IActions, ISelectors } from './store';

export interface IPresentationProps extends ISelectors, IActions {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    const { text, changeText } = this.props;
    return (
      <div>
        <UBlock my={4}>
          <UBlock
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <UTitle style={{ margin: 0 }}>Tickytook - наколдуй хэштеги</UTitle>
            <UBlock my={0} textAlign="right" display={['none', 'none', 'block']}>
              <UButton appearance="ghost" onClick={this.props.reset}>
                Новое заклятие
              </UButton>
            </UBlock>
            <UBlock my={0} textAlign="right" display={['block', 'block', 'none']}>
              <UButton appearance="ghost" onClick={this.props.reset}>
                <img src={NewSpellIcon} width="24" />
              </UButton>
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
      </div>
    );
  }
}
