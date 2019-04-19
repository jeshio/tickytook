import { Saga } from '@redux-saga/core';
import { TReducer } from '../store/types/TReducer';

export default interface IModule {
  reducers: TReducer<any, any>;
  rootSaga?: Saga;
  MODULE_NAME: string;
}
