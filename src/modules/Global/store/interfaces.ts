import { MenuItem } from 'modules/Globals/Sidebar';
import { ActionsFromActionsParameters } from 'src/core/store/types/ActionFromActionParameters';

export interface IStore {
  sidebarIsOpen: boolean;
  sidebarMainMenuItems: MenuItem[];
  sidebarExtraMenuItems: MenuItem[];
}

export interface ISelectors extends IStore {}

export interface IActionsParameters {
  switchSidebar: [];
  setSidebarExtraMenuItems: [MenuItem[]];
  resetSidebarExtraMenuItems: [];
}

export interface IActions extends ActionsFromActionsParameters<IActionsParameters> {}
