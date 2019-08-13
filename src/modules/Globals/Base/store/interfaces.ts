import { MenuItem } from 'modules/Globals/Sidebar';
import ICAction from 'src/core/store/interfaces/ICAction';

export interface IStore {
  sidebarIsOpen: boolean;
  sidebarMainMenuItems: MenuItem[];
  sidebarExtraMenuItems: MenuItem[];
}

export interface ISelectors extends IStore {}

export interface IActions {
  switchSidebar: () => ICAction;
  setSidebarExtraMenuItems: (menuItems: MenuItem[]) => ICAction;
  resetSidebarExtraMenuItems: () => ICAction;
}
