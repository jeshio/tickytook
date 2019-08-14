import ICAction from 'src/core/store/interfaces/ICAction';

export interface IStore {
  text: string;
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
  isExtendedMode: boolean;
}

export interface ISelectors extends IStore {}

export interface IActions {
  changeText: (text: string) => ICAction;
  wiz: () => ICAction;
  switchMode: () => ICAction;
  switchConvertToLower: () => ICAction;
  switchDeleteNumberWords: () => ICAction;
  switchSortByAlphabet: () => ICAction;
  setMinimumHashtagLength: (length: number) => ICAction;
  reset: () => ICAction;
}
