import ICAction from 'src/core/store/interfaces/ICAction';

export interface IStore {
  text: string;
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  spellWordsToHashtags: boolean;
  minimumHashtagLength: number;
}

export interface ISelectors extends IStore {}

export interface IActions {
  changeText: (text: string) => ICAction;
  switchConvertToLower: () => ICAction;
  switchDeleteNumberWords: () => ICAction;
  switchSortByAlphabet: () => ICAction;
  switchSpellWordsToHashtags: () => ICAction;
  setMinimumHashtagLength: (length: number) => ICAction;
  reset: () => ICAction;
}
