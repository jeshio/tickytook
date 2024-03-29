import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UInline from 'src/ui-components/UInline';
import styled from 'styled-components';
import Block from './Block';

export interface IPostProps {
  activeHashtags: string[];
  text: string;
  onCopyPost: () => void;
  switchMode: () => void;
}

export interface IPostState {
  showSuccessCopyMessage: boolean;
}

const Text = styled.p`
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
`;

const Hashtags = styled.div`
  word-break: break-word;
`;

const HashtagLink = styled.a`
  color: ${props => (props.theme as TTheme).colors.blue};
  margin-right: 0.25rem;
  display: inline-block;
`;

export default class Post extends React.Component<IPostProps, any> {
  public state = {
    showSuccessCopyMessage: false,
  };
  private copyMsgTimeout: any = null;

  public render() {
    const { showSuccessCopyMessage } = this.state;

    return (
      <Block title="Готовый пост">
        <Text>{this.props.text}</Text>
        <Hashtags>
          {this.props.activeHashtags.map(h => (
            <HashtagLink
              key={h}
              href={`https://www.instagram.com/explore/tags/${h.replace('#', '')}/`}
              target="_blank"
            >
              {h}
            </HashtagLink>
          ))}
        </Hashtags>
        <UBlock textAlign="center" paddingTop={4}>
          <UButton onClick={this.handleCopyClick} appearance="primary" extraText="текст + хэштеги">
            {showSuccessCopyMessage ? 'Готово!' : 'Копировать всё'}
          </UButton>
          <UBlock visible={[true, false]} marginTop={2}>
            <UButton onClick={this.props.switchMode} appearance="link">
              Простой режим
            </UButton>
          </UBlock>
        </UBlock>
      </Block>
    );
  }

  private handleCopyClick = () => {
    this.props.onCopyPost();
    clearTimeout(this.copyMsgTimeout);
    this.setState({ showSuccessCopyMessage: true }, () => {
      this.copyMsgTimeout = setTimeout(
        () =>
          this.setState({
            showSuccessCopyMessage: false,
          }),
        1200
      );
    });
  };
}
