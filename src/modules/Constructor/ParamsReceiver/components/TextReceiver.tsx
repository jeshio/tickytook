import * as React from 'react';

export interface TextReceiverProps {}

export default class TextReceiver extends React.PureComponent<TextReceiverProps, any> {
  public render() {
    return <div>text receiver</div>;
  }
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
