import BaseStore from 'src/core/store/BaseStore';
import { MODULE_NAME } from '../../constants';
import { DEFAULT_MAIN_MENU_ITEMS, SUB_MODULE_NAME } from '../constants';
import { IActions, ISelectors, IStore } from './interfaces';

const store = new BaseStore<IStore, IActions, ISelectors>(
  MODULE_NAME,
  SUB_MODULE_NAME,
  {
    switchSidebar: state => ({ ...state, sidebarIsOpen: !state.sidebarIsOpen }),
    setSidebarExtraMenuItems: (state, action) => ({
      ...state,
      sidebarExtraMenuItems: action.payload[0],
    }),
    resetSidebarExtraMenuItems: state => ({
      ...state,
      sidebarExtraMenuItems: [],
    }),
  },
  {
    sidebarIsOpen: false,
    sidebarMainMenuItems: DEFAULT_MAIN_MENU_ITEMS,
    sidebarExtraMenuItems: [],
  }
);

const { selectors, actions, reducers } = store;

export { selectors, actions, reducers };

export * from './interfaces';

export default reducers;
