import { Saga } from '@redux-saga/core';
import ICEndPoint from 'src/core/interfaces/ICEndPoint';
import ICEndPoints from 'src/core/interfaces/ICEndPoints';
import ICAction from 'src/core/store/interfaces/ICAction';
import { ICSagas } from 'src/core/store/interfaces/ICSagas';

export interface IStore {
  text: string;
  words: string[];
  inactiveHashtags: string[];
  extraWords: {
    data: string[];
    loading: boolean;
  };
  extraHashtags: string[];
  params: {
    convertToLower: boolean;
    deleteNumberWords: boolean;
    sortByAlphabet: boolean;
    minimumHashtagLength: number;
  };
  isExtendedMode: boolean;
}

export interface ISelectors extends IStore {
  hashtags: string[];
  activeHashtags: string[];
}

export interface IActions {
  wiz: () => ICAction;
  changeText: (text: string) => ICAction;
  changeWords: (words: string[]) => ICAction;
  switchHashtagActiveStatus: (hashtag: string) => ICAction;
  addExtraHashtag: (extraHashtag: string) => ICAction;
  fetchExtraWords: () => ICAction;
  fetchExtraWordsFailure: () => ICAction;
  fetchExtraWordsSuccess: (extraWords: string[]) => ICAction;
  switchMode: () => ICAction;
  switchParam: (param: 'convertToLower' | 'deleteNumberWords' | 'sortByAlphabet') => ICAction;
  setMinimumHashtagLength: (length: number) => ICAction;
  reset: () => ICAction;
}

export interface ISagaWorkers
  extends ICSagas<{
    fetchExtraWords: [];
    updateWords: Parameters<IActions['changeText']>;
  }> {}

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
