import { Saga } from '@redux-saga/core';
import ICEndPoint from 'src/core/interfaces/ICEndPoint';
import ICEndPoints from 'src/core/interfaces/ICEndPoints';
import ICAction from 'src/core/store/interfaces/ICAction';
import ICSagas from 'src/core/store/interfaces/ICSagas';

export interface IStore {
  words: string[];
  hashtags: string[];
  inactiveHashtags: Set<string>;
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
  extraWords: string[];
}

export interface ISelectors extends IStore {
  activeHashtags: string[];
}

export interface IActions {
  changeWords: (words: string[]) => ICAction;
  switchHashtagActiveStatus: (hashtag: string) => ICAction;
  switchConvertToLower: () => ICAction;
  switchDeleteNumberWords: () => ICAction;
  switchSortByAlphabet: () => ICAction;
  setMinimumHashtagLength: (length: number) => ICAction;
  updateExtraWords: (extraWords: string[]) => ICAction;
}

export interface ISagaWorkers extends ICSagas {
  loadHashtagsStats: Saga;
  updateWords: Saga;
}

export interface IEndPoints extends ICEndPoints {
  extraWords: ICEndPoint<
    {
      words: string;
    },
    {
      result?: string[];
    },
    {}
  >;
}
