import { IActions, IProps, ISelectors } from 'modules/Constructor/ParamsReceiver';
import { MenuItem } from 'modules/Globals/Sidebar';
import { Component, createElement } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import bindActionCreatorsWithApi from 'src/core/helpers/bindActionCreatorsWithApi';
import connect from 'src/core/hocs/connect';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import StorageService from 'src/core/services/StorageService';
import { ReactComponent as AutoModeIconComponent } from 'src/images/components/icons/auto-mode.svg';
import { ReactComponent as ManualModeIconComponent } from 'src/images/components/icons/manual-mode.svg';
import { ReactComponent as NewSpellIconComponent } from 'src/images/components/icons/reset.svg';
import * as Global from 'src/modules/Global';
import { Store } from '..';
import { STORAGE_ITEMS_NAME } from '../constants';
import Presentation, { IPresentationProps } from './Presentation';
import PresentationShortMode, { IPresentationShortModeProps } from './PresentationShortMode';

interface IContainerProps extends IProps {
  isShortModeVersion?: boolean;
}

const getSidebarItems = (props: IContainerProps): MenuItem[] => {
  return [
    {
      title: 'Новое заклятие',
      onClick: props.actions.reset,
      svg: NewSpellIconComponent,
    },
    {
      title: props.selectors.isExtendedMode ? 'Меньше настроек' : 'Больше настроек',
      onClick: props.actions.switchMode,
      svg: props.selectors.isExtendedMode ? AutoModeIconComponent : ManualModeIconComponent,
    },
  ];
};

class Container extends Component<IContainerProps> {
  public static defaultProps = {
    isShortModeVersion: false,
  };

  public componentDidMount() {
    this.updateSideBar();

    const savedText = StorageService.getIn<string>(STORAGE_ITEMS_NAME.SOURCE_TEXT) || '';
    if (savedText.length > 0 && this.props.selectors.hashtags.length === 0) {
      this.props.actions.changeText(savedText);
      this.props.actions.wiz();
    }
  }

  public componentDidUpdate() {
    this.updateSideBar();
  }

  public componentWillUnmount() {
    this.props.actions.global.resetSidebarExtraMenuItems();
  }

  public updateSideBar = () => {
    const sidebarItems = getSidebarItems(this.props);

    if (
      JSON.stringify(sidebarItems) !==
      JSON.stringify(this.props.selectors.global.sidebarExtraMenuItems)
    ) {
      this.props.actions.global.setSidebarExtraMenuItems(sidebarItems);
    }
  };

  public render() {
    if (this.props.selectors.isExtendedMode) {
      return createElement<IPresentationProps>(Presentation, this.props);
    } else if (this.props.isShortModeVersion) {
      return createElement<IPresentationShortModeProps>(PresentationShortMode, this.props);
    }

    return null;
  }
}

export default connect<ISelectors, IActions, void, Store.IStore>(
  state => ({ ...Store.selectors(state), global: Global.Store.selectors(state) } as ISelectors),
  (dispatch: Dispatch) =>
    ({
      ...bindActionCreatorsWithApi(Store.actions as ICStringIndexes, dispatch),
      global: bindActionCreators(Global.Store.actions as ICStringIndexes, dispatch),
    } as IActions)
)(Container);
