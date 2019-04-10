import React, { Component } from 'react';
import UGrid from 'src/ui-components/UGrid';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import HashtagsText from './components/HashtagsText';
import Params from './components/Params';

export interface IPresentationProps
  extends ParamsReceiverStore.ISelectors,
    Store.ISelectors,
    Store.IActions {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    return (
      <div>
        <UGrid.Row>
          <UGrid.Col md={12}>
            <Params {...this.props} />
          </UGrid.Col>
          <UGrid.Col md={12}>
            <HashtagsText {...this.props} />
          </UGrid.Col>
        </UGrid.Row>
      </div>
    );
  }
}
