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

const EmojiPicker = styled(UEmojiPicker)`
  margin-top: 5px;
`;

const StyledRInput = styled(RInput)`
  border: unset;
  font-size: 0.85rem;
  line-height: 1.1rem;
  margin-bottom: ${(props: IUInputProps) => (props.label ? '7px' : '0')};
  ${props => (props.withEmojiPicker ? 'padding-right: 45px;' : '')}

  &::placeholder {
    color: ${props => (props.theme as TTheme).colors.grey};
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
    emojiPickerIsVisible: true,
  };

  public inputRef: React.RefObject<any>;

  constructor(props: IUInputProps) {
    super(props);

    this.inputRef = React.createRef();
  }

  public handleSwitchEmojiPickerVisibleClick = () => {
    this.setState(({ emojiPickerIsVisible }) => ({ emojiPickerIsVisible: !emojiPickerIsVisible }));
  };

  public handleEmojiPickerSelect = (e: BaseEmoji) => {
    // TODO скорее всего работает только в textarea
    const { value = '' } = this.props;
    const smile = e.native;
    const lastEmojiSymbolRegExp = /[\uDC00-\uDFFF]/;
    const input = get(this.inputRef, 'current.props.inputRef.current._ref') as
      | undefined
      | HTMLInputElement;
    let selectionStart = get(
      this.inputRef.current,
      'props.inputRef.current._ref.selectionStart',
      value.length
    );
    let selectionEnd = get(
      this.inputRef.current,
      'props.inputRef.current._ref.selectionEnd',
      value.length
    );

    // фикс для добавления нескольких emoji подряд
    if (lastEmojiSymbolRegExp.test(value[selectionStart])) {
      selectionStart += 1;
    }
    if (lastEmojiSymbolRegExp.test(value[selectionEnd])) {
      selectionEnd += 1;
    }

    if (input) {
      const oldScrollPosition = input.scrollTop;
      const newValue = `${value.substring(0, selectionStart)}${smile}${value.substring(
        selectionEnd
      )}`;
      const newCursorPosition = selectionEnd + 1 - (selectionEnd - selectionStart);
      const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      ) as PropertyDescriptor).set as (v: any) => void;
      const event = new Event('input', { bubbles: true });

      nativeInputValueSetter.call(input, newValue);
      input.dispatchEvent(event);
      input.focus();

      input.scrollTop = oldScrollPosition;
      input.selectionStart = newCursorPosition;
      input.selectionEnd = newCursorPosition;
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
