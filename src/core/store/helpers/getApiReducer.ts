import update from 'immutability-helper';
import set from 'lodash/set';
import ICAction from '../interfaces/ICAction';
import ICStore from '../interfaces/ICStore';

/**
 * Устанавливает простые редьюсеры по-умолчанию
 */
export function getApiReducer<TStore extends ICStore = {}>(fieldName: string) {
  return {
    request: (state: TStore) => set({ ...state }, `${fieldName}.loading`, true),

    success: (state: TStore, action: ICAction) => {
      const newState = { ...state };
      set(newState, `${fieldName}.loading`, false);
      set(newState, `${fieldName}.data`, action.payload[0]);

      return newState;
    },

    failure: (state: TStore) => set({ ...state }, `${fieldName}.loading`, false),
  };
}
