import ICAction from 'src/core/store/interfaces/ICAction';

export interface IStore {
  text: string;
}

export interface ISelectors extends IStore {}

export interface IActions {
  changeText: (text: string) => ICAction;
}
