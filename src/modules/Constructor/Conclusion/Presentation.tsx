import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import { Store } from '.';
import { Store as ParamsReceiverStore } from '../ParamsReceiver';
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
        <UBlock display="flex" flexWrap="wrap" alignItems="flex-start">
          <UBlock paddingRight={[0, 1]} flex={1}>
            <ExtraWords
              extraHashtags={this.props.extraHashtags}
              extraWords={this.props.extraWords.data}
              loading={this.props.extraWords.loading}
              onExtraWordClick={this.props.addExtraHashtag}
            />
          </UBlock>
          <UBlock paddingLeft={[0, 1]} flex={1}>
            <HashtagsText {...this.props} />
          </UBlock>
        </UBlock>
      </div>
    );
  }
}
