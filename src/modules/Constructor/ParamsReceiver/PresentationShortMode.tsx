import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import UGrid from 'src/ui-components/UGrid';
import Params from './components/Params';
import TextReceiver from './components/TextReceiver';
import { IActions, ISelectors } from './store';

export interface IPresentationShortModeProps extends ISelectors, IActions {}

export default class PresentationShortMode extends Component<IPresentationShortModeProps, any> {
  public render() {
    const { text, changeText } = this.props;
    return (
      <UBlock marginBottom={[3]}>
        <UGrid.Row>
          <UGrid.Col md={24}>
            <UBlock>
              <TextReceiver
                value={text}
                onChange={changeText}
                onFormSubmit={this.props.wiz}
                isExtendedMode={this.props.isExtendedMode}
              />
            </UBlock>
          </UGrid.Col>
        </UGrid.Row>
        <UGrid.Row>
          <UGrid.Col md={24}>
            <UBlock>
              <Params onFormSubmit={this.props.wiz} {...this.props} />
            </UBlock>
          </UGrid.Col>
        </UGrid.Row>
      </UBlock>
    );
  }
}
