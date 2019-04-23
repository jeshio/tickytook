import * as React from 'react';
import UTextarea from 'src/ui-components/UTextarea';

export interface TextReceiverProps {
  value: string;
  onChange: (text: string) => void;
}

export default class TextReceiver extends React.PureComponent<TextReceiverProps, any> {
  public render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <UTextarea
          placeholder="Вставьте сюда текст или хэштеги..."
          rows={3}
          value={value}
          onChange={onChange}
          autoHeight={true}
        />
      </div>
    );
  }
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
