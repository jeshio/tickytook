import { IProps } from 'modules/Constructor/Conclusion';
import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import Block from './components/Block';
import ExtraWords from './components/ExtraWords';
import HashtagsText from './components/HashtagsText';
import Post from './components/Post';
import SimplePost from './components/SimplePost';

export interface IPresentationProps extends IProps {
  onCopyHashtags: () => void;
  onCopyPost: () => void;
  shortModeLeftColumn: React.ReactElement;
}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    if (this.props.selectors.isExtendedMode) {
      return this.extendedModeTemplate;
    }

    return this.shortModeTemplate;
  }

  protected get shortModeTemplate() {
    const { selectors, actions, onCopyHashtags, onCopyPost, shortModeLeftColumn } = this.props;
    return (
      <UBlock
        display="flex"
        flexWrap={'nowrap'}
        flexDirection={['column', 'column', 'row']}
        overflow="hidden"
      >
        <UBlock flex={1} px={[2, 0]} paddingRight={[2, 0, 2]}>
          {shortModeLeftColumn}
        </UBlock>
        <UBlock flex={1}>
          <UBlock visible={selectors.sourceText.length > 0}>
            <SimplePost
              activeHashtags={selectors.activeHashtags}
              text={selectors.resultText}
              onCopyPost={onCopyPost}
              onCopyHashtags={onCopyHashtags}
              loading={selectors.extraWords.loading}
              switchMode={actions.switchMode}
            />
          </UBlock>
          <UBlock visible={selectors.sourceText.length === 0} textAlign="center">
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
    const { selectors, actions, onCopyHashtags, onCopyPost } = this.props;
    return (
      <UBlock
        display="flex"
        flexWrap={'nowrap'}
        flexDirection={['column', 'column', 'row']}
        overflow="hidden"
      >
        <UBlock paddingRight={[0, 1]} flex={1}>
          <ExtraWords
            extraHashtags={selectors.extraHashtags}
            extraWords={selectors.extraWords.data}
            loading={selectors.extraWords.loading}
            onExtraWordClick={actions.addExtraHashtag}
          />
        </UBlock>
        <UBlock paddingLeft={[0, 1]} flex={1}>
          <HashtagsText
            activeHashtags={selectors.activeHashtags}
            hashtags={selectors.hashtags}
            inactiveHashtags={selectors.inactiveHashtags}
            onCopyHashtags={onCopyHashtags}
            switchHashtagActiveStatus={actions.switchHashtagActiveStatus}
          />
          <UBlock visible={selectors.sourceText.length > 0}>
            <Post
              activeHashtags={selectors.activeHashtags}
              text={selectors.resultText}
              onCopyPost={onCopyPost}
              switchMode={actions.switchMode}
            />
          </UBlock>
        </UBlock>
      </UBlock>
    );
  }
}
