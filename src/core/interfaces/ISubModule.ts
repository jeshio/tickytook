import { Saga } from '@redux-saga/core';
import { TReducer } from '../store/types/TReducer';

export default interface ISubModule {
  Store?: {
    reducers: TReducer<any, any>;
    rootSaga?: Saga;
  };
  SUB_MODULE_NAME: string;
}
