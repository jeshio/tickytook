import React, { Component } from 'react';
import UGrid from 'src/ui-components/UGrid';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
import Params from '../ParamsReceiver/components/Params';
import ExtraWords from './components/ExtraWords';
import HashtagsText from './components/HashtagsText';

export interface IPresentationProps
  extends ParamsReceiverStore.ISelectors,
    Store.ISelectors,
    Store.IActions {
  onCopyHashtags: () => void;
}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    return (
      <div>
        <UGrid.Row>
          <UGrid.Col md={12}>
            <ExtraWords
              extraHashtags={this.props.extraHashtags}
              extraWords={this.props.extraWords.data}
              loading={this.props.extraWords.loading}
              onExtraWordClick={this.props.addExtraHashtag}
            />
          </UGrid.Col>
          <UGrid.Col md={12}>
            <HashtagsText {...this.props} />
          </UGrid.Col>
        </UGrid.Row>
      </div>
    );
  }
}
