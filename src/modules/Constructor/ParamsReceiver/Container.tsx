import { MenuItem } from 'modules/Globals/Sidebar';
import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ICStringIndexes from 'src/core/interfaces/ICStringIndexes';
import { ReactComponent as AutoModeIconComponent } from 'src/images/components/icons/auto-mode.svg';
import { ReactComponent as ManualModeIconComponent } from 'src/images/components/icons/manual-mode.svg';
import { ReactComponent as NewSpellIconComponent } from 'src/images/components/icons/reset.svg';
import { Store as BaseStore } from 'src/modules/Globals/Base';
import { Actions, Selectors, Store } from '.';
import Presentation, { IPresentationProps } from './Presentation';
import PresentationShortMode, { IPresentationShortModeProps } from './PresentationShortMode';

interface IContainerProps extends Selectors, Actions {
  isShortModeVersion?: boolean;
}

const getSidebarItems = (props: IContainerProps): MenuItem[] => {
  return [
    {
      title: 'Новое заклятие',
      onClick: props.reset,
      svg: NewSpellIconComponent,
    },
    {
      title: props.isExtendedMode ? 'Меньше настроек' : 'Больше настроек',
      onClick: props.switchMode,
      svg: props.isExtendedMode ? AutoModeIconComponent : ManualModeIconComponent,
    },
  ];
};

class Container extends Component<IContainerProps> {
  public static defaultProps = {
    isShortModeVersion: false,
  };

  public componentDidMount() {
    this.updateSideBar();
  }

  public componentDidUpdate() {
    this.updateSideBar();
  }

  public componentWillUnmount() {
    this.props.baseActions.resetSidebarExtraMenuItems();
  }

  public updateSideBar = () => {
    const sidebarItems = getSidebarItems(this.props);

    if (
      JSON.stringify(sidebarItems) !==
      JSON.stringify(this.props.baseSelectors.sidebarExtraMenuItems)
    ) {
      this.props.baseActions.setSidebarExtraMenuItems(sidebarItems);
    }
  };

  public render() {
    if (this.props.isExtendedMode) {
      return createElement<IPresentationProps>(Presentation, this.props);
    } else if (this.props.isShortModeVersion) {
      return createElement<IPresentationShortModeProps>(PresentationShortMode, this.props);
    }

    return null;
  }
}

export default connect<Selectors, Actions, void, Store.IStore>(
  state => ({ ...Store.selectors(state), baseSelectors: BaseStore.selectors(state) } as Selectors),
  (dispatch: Dispatch) =>
    ({
      ...bindActionCreators(Store.actions as ICStringIndexes, dispatch),
      baseActions: bindActionCreators(BaseStore.actions as ICStringIndexes, dispatch),
    } as Actions)
)(Container);
