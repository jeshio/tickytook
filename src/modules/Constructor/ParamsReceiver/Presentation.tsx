import { IProps } from 'modules/Constructor/ParamsReceiver';
import React, { Component } from 'react';
import UBlock from 'src/ui-components/UBlock';
import UGrid from 'src/ui-components/UGrid';
import Params from './components/Params';
import TextReceiver from './components/TextReceiver';

export interface IPresentationProps extends IProps {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    const { actions, selectors } = this.props;
    return (
      <UBlock marginBottom={[3]}>
        <UGrid.Row>
          <UGrid.Col md={24}>
            <UBlock>
              <TextReceiver
                value={selectors.text}
                onChange={actions.changeText}
                onFormSubmit={actions.wiz}
                isExtendedMode={selectors.isExtendedMode}
              />
            </UBlock>
          </UGrid.Col>
        </UGrid.Row>
        <UGrid.Row>
          <UGrid.Col md={24}>
            <UBlock>
              <Params
                convertToLower={selectors.params.convertToLower}
                deleteNumberWords={selectors.params.deleteNumberWords}
                sortByAlphabet={selectors.params.sortByAlphabet}
                isExtendedMode={selectors.isExtendedMode}
                minimumHashtagLength={selectors.params.minimumHashtagLength}
                setMinimumHashtagLength={actions.setMinimumHashtagLength}
                switchConvertToLower={actions.switchParam.bind(null, 'convertToLower')}
                switchDeleteNumberWords={actions.switchParam.bind(null, 'deleteNumberWords')}
                switchSortByAlphabet={actions.switchParam.bind(null, 'sortByAlphabet')}
              />
            </UBlock>
          </UGrid.Col>
        </UGrid.Row>
      </UBlock>
    );
  }
}
