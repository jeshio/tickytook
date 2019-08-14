import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import { Store } from '.';
import Block from './components/Block';
import ExtraWords from './components/ExtraWords';
import HashtagsText from './components/HashtagsText';
import Post from './components/Post';
import SimplePost from './components/SimplePost';
import { Selectors } from './module';

export interface IPresentationProps extends Selectors, Store.IActions {
  onCopyHashtags: () => void;
  onCopyPost: () => void;
  isExtendedMode: boolean;
  shortModeLeftColumn: React.ReactElement;
  switchMode: () => void;
}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    if (this.props.isExtendedMode) {
      return this.extendedModeTemplate;
    }

    return this.shortModeTemplate;
  }

  protected get shortModeTemplate() {
    return (
      <UBlock
        display="flex"
        flexWrap={'nowrap'}
        flexDirection={['column', 'column', 'row']}
        overflow="hidden"
      >
        <UBlock flex={1} px={[2, 0]} paddingRight={[2, 0, 2]}>
          {this.props.shortModeLeftColumn}
        </UBlock>
        <UBlock flex={1}>
          <UBlock visible={this.props.paramsReceiver.text.length > 0}>
            <SimplePost
              activeHashtags={this.props.activeHashtags}
              text={this.props.paramsReceiver.text}
              onCopyPost={this.props.onCopyPost}
              onCopyHashtags={this.props.onCopyHashtags}
              loading={this.props.extraWords.loading}
              switchMode={this.props.switchMode}
            />
          </UBlock>
          <UBlock visible={this.props.paramsReceiver.text.length === 0} textAlign="center">
            <Block>
              <UBlock p={6} paddingTop={7}>
                Для начала введите текст поста.
              </UBlock>
            </Block>
          </UBlock>
        </UBlock>
      </UBlock>
    );
  }

  protected get extendedModeTemplate() {
    return (
      <UBlock
        display="flex"
        flexWrap={'nowrap'}
        flexDirection={['column', 'column', 'row']}
        overflow="hidden"
      >
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
          <UBlock visible={this.props.paramsReceiver.text.length > 0}>
            <Post
              activeHashtags={this.props.activeHashtags}
              text={this.props.paramsReceiver.text}
              onCopyPost={this.props.onCopyPost}
              switchMode={this.props.switchMode}
            />
          </UBlock>
        </UBlock>
      </UBlock>
    );
  }
}
