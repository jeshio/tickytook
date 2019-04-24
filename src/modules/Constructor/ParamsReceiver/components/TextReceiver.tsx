import * as React from 'react';
import UTextarea from 'src/ui-components/UTextarea';

export interface TextReceiverProps {
  value: string;
  onChange: (text: string) => void;
}

export default class TextReceiver extends React.PureComponent<TextReceiverProps, any> {
  private fieldRef = React.createRef();

  public componentDidMount() {
    try {
      if (this.fieldRef.current) {
        (this.fieldRef.current as any)._ref.focus();
      }
      // tslint:disable-next-line: no-empty
    } catch (e) {}
  }

  public render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <UTextarea
          placeholder="Вставьте сюда заклятие (текст или хэштеги)..."
          rows={1}
          value={value}
          onChange={onChange}
          autoHeight={true}
          inputRef={this.fieldRef}
        />
      </div>
    );
  }
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
