import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import styled from 'styled-components';
import Block from './Block';

export interface ISimplePostProps {
  activeHashtags: string[];
  text: string;
  isShortVersion?: boolean;
  loading: boolean;
  onCopyPost: () => void;
  onCopyHashtags: () => void;
}

export interface ISimplePostState {
  showSuccessCopyMessage: [boolean, boolean];
}

const Root = styled(Block)`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

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

const Button = styled(UButton)`
  margin: 0 0.5rem 0.5rem;
  padding: 0.25rem 2rem !important;
  min-width: 166px;
  text-align: center;
`;

export default class SimplePost extends React.Component<ISimplePostProps, any> {
  public state = {
    showSuccessCopyMessage: [false, false],
  };
  private copyMsgTimeouts: any = [null, null];

  public render() {
    const { showSuccessCopyMessage } = this.state;

    return (
      <Root title="Готовый пост" loading={this.props.loading}>
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
          <Button
            onClick={this.handleCopyHashtagsClick}
            appearance="ghost"
            extraText="только хэштеги"
          >
            {showSuccessCopyMessage[1] ? 'Готово!' : 'Копировать'}
          </Button>
          <Button onClick={this.handleCopyPostClick} appearance="primary" extraText="весь пост">
            {showSuccessCopyMessage[0] ? 'Готово!' : 'Копировать'}
          </Button>
        </UBlock>
      </Root>
    );
  }

  private handleCopyHashtagsClick = () => {
    this.props.onCopyHashtags();
    clearTimeout(this.copyMsgTimeouts[1]);
    this.setState(
      ({ showSuccessCopyMessage }: ISimplePostState) => ({
        showSuccessCopyMessage: [showSuccessCopyMessage[0], true],
      }),
      () => {
        this.copyMsgTimeouts = setTimeout(
          () =>
            this.setState(({ showSuccessCopyMessage }: ISimplePostState) => ({
              showSuccessCopyMessage: [showSuccessCopyMessage[0], false],
            })),
          1200
        );
      }
    );
  };

  private handleCopyPostClick = () => {
    this.props.onCopyPost();
    clearTimeout(this.copyMsgTimeouts[0]);
    this.setState(
      ({ showSuccessCopyMessage }: ISimplePostState) => ({
        showSuccessCopyMessage: [true, showSuccessCopyMessage[1]],
      }),
      () => {
        this.copyMsgTimeouts = setTimeout(
          () =>
            this.setState(({ showSuccessCopyMessage }: ISimplePostState) => ({
              showSuccessCopyMessage: [false, showSuccessCopyMessage[1]],
            })),
          1200
        );
      }
    );
  };
}
