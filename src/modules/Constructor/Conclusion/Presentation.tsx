import React, { Component } from 'react';
import UGrid from 'src/ui-components/UGrid';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import HashtagsText from './components/HashtagsText';

export interface IPresentationProps
  extends ParamsReceiverStore.ISelectors,
    Store.ISelectors,
    Store.IActions {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    return (
      <div>
        <UGrid.Row>
          <UGrid.Col mdOffset={12} md={12}>
            <HashtagsText words={this.props.words} />
          </UGrid.Col>
        </UGrid.Row>
      </div>
    );
  }
}
