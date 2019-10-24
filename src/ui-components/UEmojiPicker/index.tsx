import { Picker, PickerProps } from 'emoji-mart';
import * as React from 'react';
import styled from 'styled-components';

import i18n from './i18n';

export interface IUEmojiPickerProps {
  onSelect?: PickerProps['onSelect'];
  type?: PickerProps['set'];
  size?: PickerProps['emojiSize'];
  sheetSize?: PickerProps['sheetSize'];
  className?: string;
}

const Root = styled.div`
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;

  .emoji-mart-search input {
    box-sizing: border-box;
    margin-bottom: 5px;
  }
`;

const UEmojiPicker = (props: IUEmojiPickerProps) => {
  return (
    <Root className={props.className}>
      <Picker
        onSelect={props.onSelect}
        set={props.type}
        emojiSize={props.size}
        sheetSize={props.sheetSize}
        showPreview={false}
        showSkinTones={false}
        style={{ display: 'inline', border: 'unset' }}
        i18n={i18n}
      />
    </Root>
  );
};

UEmojiPicker.defaultProps = {
  size: 24,
  sheetSize: 32,
};

export default UEmojiPicker;
