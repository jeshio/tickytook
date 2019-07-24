import ICAction from 'src/core/store/interfaces/ICAction';

export interface IStore {
  sidebarIsOpen: boolean;
}

export interface ISelectors extends IStore {}

export interface IActions {
  switchSidebar: () => ICAction;
}
