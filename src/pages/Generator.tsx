import * as React from 'react';
import Conclusion from 'src/modules/Constructor/Conclusion';
import ParamsReceiver from 'src/modules/Constructor/ParamsReceiver';
import SubHeader from 'src/modules/Constructor/SubHeader';
import UBlock from 'src/ui-components/UBlock';

export interface IGeneratorPageProps {}

export default class GeneratorPage extends React.PureComponent<IGeneratorPageProps, any> {
  public render() {
    return (
      <div>
        <UBlock px={[2, 0, 0]}>
          <SubHeader />
        </UBlock>

        <ParamsReceiver />

        <Conclusion shortModeLeftColumn={<ParamsReceiver isShortModeVersion={true} />} />
      </div>
    );
  }
}
