import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import { Store } from '.';
import ExtraWords from './components/ExtraWords';
import HashtagsText from './components/HashtagsText';
import Post from './components/Post';
import { Selectors } from './module';

export interface IPresentationProps extends Selectors, Store.IActions {
  onCopyHashtags: () => void;
  onCopyPost: () => void;
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
            <Post
              activeHashtags={this.props.activeHashtags}
              text={this.props.paramsReceiver.text}
              onCopyPost={this.props.onCopyPost}
            />
          </UBlock>
        </UBlock>
      </div>
    );
  }
}
