import React, { Component } from 'react';
import UFlexboxGrid from 'src/ui-components/UFlexboxGrid';
import UGrid from 'src/ui-components/UGrid';
import ConstructorParams from './components/ConstructorParams';
import TextReceiver from './components/TextReceiver';

export interface IPresentationProps {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    return (
      <div>
        <UGrid.Row>
          <UGrid.Col md={12}>
            <TextReceiver />
          </UGrid.Col>
          <UGrid.Col md={12}>
            <ConstructorParams />
          </UGrid.Col>
        </UGrid.Row>
      </div>
    );
  }
}
