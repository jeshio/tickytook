import * as React from 'react';
import UTextarea from 'src/ui-components/UTextarea';

export interface TextReceiverProps {}

export default class TextReceiver extends React.PureComponent<TextReceiverProps, any> {
  public render() {
    return (
      <div>
        <UTextarea placeholder="Вставьте сюда хэштеги на русском или английском" rows={5} />
      </div>
    );
  }
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
