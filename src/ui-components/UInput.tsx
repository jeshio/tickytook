import cn from 'classnames';
import { BaseEmoji } from 'emoji-mart';
import get from 'lodash/get';
import * as React from 'react';
import { Smile } from 'react-feather';
import { Input as RInput } from 'rsuite';
import { InputProps } from 'rsuite/lib/Input';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';
import UButton from './UButton';
import UEmojiPicker from './UEmojiPicker';

export interface IUInputProps extends InputProps {
  label?: string;
  withEmojiPicker?: boolean;
}

export interface IUInputState {
  emojiPickerIsVisible?: boolean;
}

const Root = styled.div`
  position: relative;
`;

const Label = styled.span`
  position: absolute;
  text-transform: lowercase;
  font-size: 0.8rem;
  bottom: -15px;
  right: 4px;
`;

const Button = styled(UButton)`
  position: absolute;
  bottom: 1px;
  right: -10px;

  &.u-override {
    &:hover svg,
    &:hover:focus:active svg,
    &:focus:active svg,
    &:focus svg,
    svg {
      fill: transparent;
      opacity: 0.3;
    }

    &:hover svg {
      opacity: 0.5;
    }

    &:hover:focus:active svg {
      opacity: 0.7;
    }
  }
`;

const EmojiPicker = styled<any>(UEmojiPicker)`
  margin-top: 5px;
  max-height: 300px;

  .emoji-mart-scroll {
    height: 211px;
  }
`;

const StyledRInput = styled(
  React.forwardRef(({ withEmojiPicker, ...props }: IUInputProps, ref) => (
    <RInput {...props} ref={ref} />
  ))
)`
  border: unset;
  font-size: 0.85rem;
  line-height: 1.1rem;
  margin-bottom: ${(props: IUInputProps) => (props.label ? '7px' : '0')};
  ${props => (props.withEmojiPicker ? 'padding-right: 45px;' : '')}

  &::placeholder {
    color: ${props => (props.theme as TTheme).colors.grey};
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }

  &.rs-input,
  &.rs-input-number {
    width: 100%;
  }
`;

class UInput extends React.PureComponent<IUInputProps, IUInputState> {
  public static defaultProps = {
    withEmojiPicker: false,
  };

  public state = {
    emojiPickerIsVisible: false,
  };

  public inputRef: React.RefObject<any>;

  constructor(props: IUInputProps) {
    super(props);

    this.inputRef = React.createRef();
  }

  get lastEmojiSymbolRegExp() {
    return /[\uDC00-\uDFFF]/;
  }

  get input() {
    return get(this.inputRef, 'current.props.inputRef.current._ref') as
      | undefined
      | HTMLInputElement;
  }

  get selectionStart() {
    const { value = '' } = this.props;
    const selectionStart = get(
      this.inputRef.current,
      'props.inputRef.current._ref.selectionStart',
      value.length
    );
    // фикс для добавления нескольких emoji подряд
    if (this.lastEmojiSymbolRegExp.test(value[selectionStart])) {
      return selectionStart + 1;
    }

    return selectionStart;
  }

  get selectionEnd() {
    const { value = '' } = this.props;
    const selectionEnd = get(
      this.inputRef.current,
      'props.inputRef.current._ref.selectionEnd',
      value.length
    );
    // фикс для добавления нескольких emoji подряд
    if (this.lastEmojiSymbolRegExp.test(value[selectionEnd])) {
      return selectionEnd + 1;
    }

    return selectionEnd;
  }

  public handleSwitchEmojiPickerVisibleClick = () => {
    this.setState(({ emojiPickerIsVisible }) => {
      const { input, selectionStart, selectionEnd } = this;

      // при переключениях не теряем фокус
      if (input) {
        const oldScrollPosition = input.scrollTop;
        input.focus();
        input.scrollTop = oldScrollPosition;
        input.selectionStart = selectionStart;
        input.selectionEnd = selectionEnd;
      }
      return { emojiPickerIsVisible: !emojiPickerIsVisible };
    });
  };

  public handleEmojiPickerSelect = (e: BaseEmoji) => {
    // TODO скорее всего работает только в textarea
    const { input } = this;
    const smile = e.native;

    if (input) {
      document.execCommand('insertText', false, smile);
    }
  };

  public render() {
    const {
      props: { label, withEmojiPicker, ...props },
      state,
    } = this;

    return (
      <>
        <Root>
          <StyledRInput
            label={label}
            withEmojiPicker={withEmojiPicker}
            {...props}
            className={cn('u-override', props.className)}
            ref={this.inputRef}
          />
          <Label>{label}</Label>
          {withEmojiPicker && (
            <Button
              onClick={this.handleSwitchEmojiPickerVisibleClick}
              icon={<Smile />}
              noBg={true}
            />
          )}
        </Root>
        {withEmojiPicker && (
          <EmojiPicker
            isVisible={state.emojiPickerIsVisible}
            onSelect={this.handleEmojiPickerSelect}
          />
        )}
      </>
    );
  }
}

export default UInput;
