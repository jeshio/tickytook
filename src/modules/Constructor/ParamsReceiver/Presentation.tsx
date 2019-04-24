import React, { Component } from 'react';
import UGrid from 'src/ui-components/UGrid';
import Params from './components/Params';
import TextReceiver from './components/TextReceiver';
import { IActions, ISelectors } from './store';

export interface IPresentationProps extends ISelectors, IActions {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    const { text, changeText } = this.props;
    return (
      <div>
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
