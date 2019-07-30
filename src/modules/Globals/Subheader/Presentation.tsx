import * as React from 'react';
import { Store as BaseStore } from 'src/modules/Globals/Base';
import UBlock from 'src/ui-components/UBlock';
import Menu from './components/Menu';

export interface IPresentationProps extends BaseStore.ISelectors {}

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    return (
      <UBlock marginTop={2} marginBottom={3} visible={[false, false, true]}>
        <Menu items={this.props.sidebarExtraMenuItems} />
      </UBlock>
    );
  }
}
