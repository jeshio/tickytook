import * as React from 'react';
import Conclusion from 'src/modules/Constructor/Conclusion';
import ParamsReceiver from 'src/modules/Constructor/ParamsReceiver';

export interface IGeneratorPageProps {}

export default class GeneratorPage extends React.PureComponent<IGeneratorPageProps, any> {
  public render() {
    return (
      <div>
        <ParamsReceiver />

        <Conclusion shortModeLeftColumn={<ParamsReceiver isShortModeVersion={true} />} />
      </div>
    );
  }
}
