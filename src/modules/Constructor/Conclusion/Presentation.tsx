import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import UFlexboxGrid from 'src/ui-components/UFlexboxGrid';
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
        <UBlock display="flex" flexWrap="wrap">
          <ExtraWords
            extraHashtags={this.props.extraHashtags}
            extraWords={this.props.extraWords.data}
            loading={this.props.extraWords.loading}
            onExtraWordClick={this.props.addExtraHashtag}
          />
          <HashtagsText {...this.props} />
        </UBlock>
        {/* <UGrid.Row>
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
        </UGrid.Row> */}
      </div>
    );
  }
}
