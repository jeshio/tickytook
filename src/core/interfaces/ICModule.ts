import { Saga } from '@redux-saga/core';
import { TReducer } from '../store/types/TReducer';

export default interface ICModule {
  reducers: TReducer<any, any>;
  rootSaga?: Saga;
  MODULE_NAME: string;
}
