import { Saga } from '@redux-saga/core';

export default interface ICSagas {
  [key: string]: Saga;
}
