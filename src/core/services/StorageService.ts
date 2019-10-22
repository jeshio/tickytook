import attempt from 'lodash/attempt';
import get from 'lodash/get';
import isError from 'lodash/isError';
import isObject from 'lodash/isObject';
import setWith from 'lodash/setWith';
import unset from 'lodash/unset';

export default class StorageService {
  static get storage() {
    return localStorage;
  }

  public static getIn<T extends any = any>(path: string | string[]): T | string | null {
    const pathArray = Array.isArray(path) ? path : String(path).split('.');
    const rootKey = pathArray[0];
    const originalItem = StorageService.storage.getItem(rootKey);
    const rootItem = attempt(JSON.parse, originalItem);

    if (pathArray.length > 1) {
      if (isError(rootItem)) {
        return null;
      }

      return get(rootItem, pathArray.slice(1));
    } else {
      if (isError(rootItem)) {
        return originalItem;
      }

      return rootItem as T;
    }
  }

  public static setIn(path: string | string[], value: any) {
    const pathArray = Array.isArray(path) ? path : String(path).split('.');
    const rootKey = pathArray[0];
    const originalItem = StorageService.storage.getItem(rootKey);
    let result;

    if (pathArray.length > 1) {
      let rootItem = attempt(JSON.parse, originalItem);

      if (isError(rootItem) || !isObject(rootItem)) {
        rootItem = {};
      }

      setWith(rootItem, pathArray.slice(1), value, Object);

      result = JSON.stringify(rootItem);
    } else {
      result = value;
    }

    StorageService.storage.setItem(rootKey, result);
  }

  public static removeIn(path: string | string[]) {
    const pathArray = Array.isArray(path) ? path : String(path).split('.');
    const rootKey = pathArray[0];

    if (pathArray.length > 1) {
      const originalItem = StorageService.storage.getItem(rootKey);
      const rootItem = attempt(JSON.parse, originalItem);

      if (isError(rootItem) || !isObject(rootItem)) {
        return;
      }

      unset(rootItem, pathArray.slice(1));

      StorageService.storage.setItem(rootKey, JSON.stringify(rootItem));
    } else {
      StorageService.storage.removeItem(rootKey);
    }
  }
}
