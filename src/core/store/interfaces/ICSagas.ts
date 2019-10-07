import { Saga } from '@redux-saga/core';

export type ICSagas<T extends { [key: string]: any }> = { [K in keyof T]: Saga<T[K]> };
