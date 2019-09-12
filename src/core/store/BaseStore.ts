import { Subtract } from 'utility-types';
import ICStringIndexes from '../interfaces/ICStringIndexes';
import { AddTypeToKeys } from '../util-types/AddTypeToKeys';
import ICAction from './interfaces/ICAction';
import ICStore from './interfaces/ICStore';
import { ActionsFromActionsParameters } from './types/ActionFromActionParameters';
import { TReducer } from './types/TReducer';
import makeReducersByKeys from './utils/makeReducerByKeys';

export default class BaseStore<
  StoreT extends ICStore,
  ActionsParametersT extends ICStringIndexes,
  SelectorsT extends StoreT,
  ApiT = {},
  ActionsWithType = AddTypeToKeys<
    ActionsFromActionsParameters<ActionsParametersT>,
    { type: string }
  >
> {
  protected moduleName: string;
  protected reducersList: Array<TReducer<StoreT, any>> = [];
  protected _actions: ActionsWithType = {} as ActionsWithType;
  protected _selectors: SelectorsT = {} as SelectorsT;
  protected _initialStore: StoreT = {} as StoreT;
  protected _api: ApiT = {} as ApiT;

  constructor(
    moduleName: string,
    initialActions: {
      [P in keyof ActionsParametersT]: TReducer<StoreT, ActionsParametersT[P]>
    } = {} as ActionsParametersT,
    initialFields: StoreT = {} as StoreT,
    initialSelectors: {
      [P in keyof Subtract<SelectorsT, StoreT>]: (
        subModuleStore: StoreT,
        globalStore: ICStore,
        selectors: SelectorsT
      ) => SelectorsT[P]
    } &
      {
        [P in keyof StoreT]?: (
          subModuleStore: StoreT,
          globalStore: ICStore,
          selectors: SelectorsT
        ) => SelectorsT[P]
      } = {} as SelectorsT
  ) {
    this.moduleName = moduleName;
    this.setAction = this.setAction.bind(this);
    this.addStoreField = this.addStoreField.bind(this);
    if (initialActions) {
      Object.keys(initialActions).map(actionName =>
        this.setAction(actionName, initialActions[
          actionName
        ] as ActionsParametersT[typeof actionName])
      );
    }
    if (initialFields) {
      Object.keys(initialFields).map(fieldName =>
        this.addStoreField(fieldName, initialFields[fieldName])
      );
    }
    if (initialSelectors) {
      Object.keys(initialSelectors).map((selectorName: keyof SelectorsT) =>
        this.addSelector(selectorName, (initialSelectors as SelectorsT)[
          selectorName
        ] as SelectorsT[typeof selectorName])
      );
    }
  }

  public get actions() {
    return this._actions;
  }

  public get api() {
    return this._api;
  }

  public get initialStore() {
    return this._initialStore;
  }

  public selectors = (store: StoreT | ICStore): SelectorsT => {
    return Object.keys(this._selectors).reduce(
      (base, selectorName: string) => ({
        ...base,
        [selectorName]: this._selectors[selectorName](
          store[this.moduleName],
          store,
          base as SelectorsT
        ),
      }),
      {}
    ) as SelectorsT;
  };

  public reducers = (store = this._initialStore, action: ICAction) => {
    return this.reducersList.reduce(
      (currentStore: StoreT, reducer: TReducer<StoreT>) => reducer(currentStore, action),
      store
    );
  };

  public setAction = <K extends keyof ActionsParametersT>(
    actionName: K,
    reducer: TReducer<StoreT, ActionsParametersT[K]>
  ) => {
    const modelActionType = this.makeActionType(actionName);
    const action = (...args: ActionsParametersT[K]): ICAction<ActionsParametersT[K]> => ({
      payload: args,
      type: modelActionType,
    });
    action.type = modelActionType;
    this.reducersList.push(
      makeReducersByKeys<StoreT, ActionsParametersT[K]>({
        [modelActionType]: reducer,
      })
    );
    this._actions = {
      ...this._actions,
      [actionName]: action,
    };

    return this;
  };

  public addStoreField = <K extends keyof StoreT>(name: K, initialValue: StoreT[K]) => {
    this._initialStore = { ...this._initialStore, [name]: initialValue };
    this.addSelector(name as keyof SelectorsT, (store: StoreT) => store[name] as SelectorsT[K]);
    return this;
  };

  public addSelector = <K extends keyof SelectorsT>(
    name: K,
    handler: (store: StoreT) => SelectorsT[K]
  ) => {
    this._selectors = {
      ...this._selectors,
      [name]: handler,
    };

    return this;
  };

  public setApi = (api: ApiT) => {
    this._api = api;
  };

  protected makeActionType(actionName: keyof ActionsParametersT) {
    return `${this.moduleName}/${actionName}`;
  }
}
