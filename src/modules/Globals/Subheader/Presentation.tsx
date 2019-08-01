import * as React from 'react';
import { Store as BaseStore } from 'src/modules/Globals/Base';
import UBlock from 'src/ui-components/UBlock';
import Menu from './components/Menu';

export interface IPresentationProps extends BaseStore.ISelectors {}

export default class Presentation extends React.PureComponent<IPresentationProps> {
  public render() {
    const { sidebarExtraMenuItems } = this.props;

    if (sidebarExtraMenuItems.length === 0) {
      return null;
    }

    return (
      <UBlock marginTop={2} marginBottom={5} visible={[false, false, true]} textAlign="center">
        <Menu items={sidebarExtraMenuItems} />
      </UBlock>
    );
  }
}
