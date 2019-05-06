import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import UStep from 'src/ui-components/UStep';
import UTextarea from 'src/ui-components/UTextarea';
import styled from 'styled-components';
import { space } from 'styled-system';

export interface TextReceiverProps {
  value: string;
  onChange: (text: string) => void;
}

const Root = styled.div`
  position: relative;
  padding-left: 48px;
`;

const Textarea = styled(UTextarea)`
  border-radius: 0 5px 5px 0;
  min-height: 48px !important;
  ${space};
`;

const Step = styled(UStep)`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px 0 0 5px;
`;

export default class TextReceiver extends React.PureComponent<TextReceiverProps, any> {
  private fieldRef = React.createRef();

  public componentDidMount() {
    try {
      if (this.fieldRef.current) {
        (this.fieldRef.current as any)._ref.focus();
      }
    } catch (e) {}
  }

  public render() {
    const { value, onChange } = this.props;
    return (
      <Root>
        <Step>1</Step>
        <Textarea
          placeholder="Напишите сюда заклятие (текст или хэштеги)..."
          rows={1}
          value={value}
          onChange={onChange}
          autoHeight={true}
          inputRef={this.fieldRef}
          paddingTop={['6px', 4]}
        />
      </Root>
    );
  }
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
