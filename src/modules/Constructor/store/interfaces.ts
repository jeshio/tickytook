import ICEndPoint from 'src/core/interfaces/ICEndPoint';
import ICEndPoints from 'src/core/interfaces/ICEndPoints';
import ICApiAction from 'src/core/store/interfaces/ICApiAction';
import { ICSagas } from 'src/core/store/interfaces/ICSagas';
import { ActionsFromActionsParameters } from 'src/core/store/types/ActionFromActionParameters';

export interface IStore {
  sourceText: string;
  resultText: string;
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

export interface IActionsParameters {
  wiz: [];
  changeText: [string];
  makeResultText: [string];
  changeWords: [string[]];
  switchHashtagActiveStatus: [string];
  addExtraHashtag: [string];
  switchMode: [];
  switchParam: ['convertToLower' | 'deleteNumberWords' | 'sortByAlphabet'];
  setMinimumHashtagLength: [number];
  reset: [];
}

export interface IActions extends ActionsFromActionsParameters<IActionsParameters> {
  fetchExtraWords: ICApiAction<[], [string[]]>;
}

export interface ISagaWorkers
  extends ICSagas<{
    fetchExtraWords: [];
    updateWords: IActionsParameters['changeText'];
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
