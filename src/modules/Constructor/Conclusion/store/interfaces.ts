import { Saga } from '@redux-saga/core';
import ICEndPoint from 'src/core/interfaces/ICEndPoint';
import ICEndPoints from 'src/core/interfaces/ICEndPoints';
import ICAction from 'src/core/store/interfaces/ICAction';
import ICSagas from 'src/core/store/interfaces/ICSagas';

export interface IStore {
  words: string[];
  inactiveHashtags: string[];
  extraWords: {
    data: string[];
    loading: boolean;
  };
  extraHashtags: string[];
}

export interface ISelectors extends IStore {
  hashtags: string[];
  activeHashtags: string[];
}

export interface IActions {
  changeWords: (words: string[]) => ICAction;
  switchHashtagActiveStatus: (hashtag: string) => ICAction;
  addExtraHashtag: (extraHashtag: string) => ICAction;
  fetchExtraWords: () => ICAction;
  fetchExtraWordsFailure: () => ICAction;
  fetchExtraWordsSuccess: (extraWords: string[]) => ICAction;
  reset: () => ICAction;
}

export interface ISagaWorkers extends ICSagas {
  fetchExtraWords: Saga;
  updateWords: Saga;
}

export interface IEndPoints extends ICEndPoints {
  extraWords: ICEndPoint<
    {
      result?: string[];
    },
    {},
    {},
    {
      words: string[];
    }
  >;
}
