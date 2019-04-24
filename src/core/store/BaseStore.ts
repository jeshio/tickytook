import { Subtract } from 'utility-types';
import ICStringIndexes from '../interfaces/ICStringIndexes';
import { AddTypeToKeys } from '../util-types/AddTypeToKeys';
import ICAction from './interfaces/ICAction';
import ICStore from './interfaces/ICStore';
import { TReducer } from './types/TReducer';
import makeReducersByKeys from './utils/makeReducerByKeys';

export default class BaseStore<
  StoreT extends ICStore,
  ActionsT extends ICStringIndexes,
  SelectorsT extends StoreT,
  ApiT = {},
  ActionsWithType = AddTypeToKeys<ActionsT, { type: string }>
> {
  protected moduleName: string;
  protected subModuleName: string;
  protected reducersList: Array<TReducer<StoreT, any>> = [];
  protected pActions: ActionsWithType = {} as ActionsWithType;
  protected pSelectors: SelectorsT = {} as SelectorsT;
  protected pInitialStore: StoreT = {} as StoreT;
  protected pApi: ApiT = {} as ApiT;

  constructor(
    moduleName: string,
    subModuleName: string,
    initialActions: {
      [P in keyof ActionsT]: TReducer<StoreT, Parameters<ActionsT[P]>>
    } = {} as ActionsT,
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
    this.subModuleName = subModuleName;
    this.setAction = this.setAction.bind(this);
    this.addStoreField = this.addStoreField.bind(this);
    if (initialActions) {
      Object.keys(initialActions).map(actionName =>
        this.setAction(actionName, initialActions[actionName] as ActionsT[typeof actionName])
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
    return this.pActions;
  }

  public get api() {
    return this.pApi;
  }

  public get initialStore() {
    return this.pInitialStore;
  }

  public selectors = (store: StoreT | ICStore): SelectorsT => {
    return Object.keys(this.pSelectors).reduce(
      (base, selectorName: string) => ({
        ...base,
        [selectorName]: this.pSelectors[selectorName](
          store[this.moduleName][this.subModuleName],
          store,
          base as SelectorsT
        ),
      }),
      {}
    ) as SelectorsT;
  };

  public reducers = (store = this.pInitialStore, action: ICAction) => {
    return this.reducersList.reduce(
      (currentStore: StoreT, reducer: TReducer<StoreT>) => reducer(currentStore, action),
      store
    );
  };

  public setAction = <K extends keyof ActionsT>(
    actionName: K,
    reducer: TReducer<StoreT, Parameters<ActionsT[K]>>
  ) => {
    const modelActionType = this.makeActionType(actionName);
    const action = (...args: Parameters<ActionsT[K]>): ICAction<Parameters<ActionsT[K]>> => ({
      payload: args,
      type: modelActionType,
    });
    action.type = modelActionType;
    this.reducersList.push(
      makeReducersByKeys<StoreT, Parameters<ActionsT[K]>>({
        [modelActionType]: reducer,
      })
    );
    this.pActions = {
      ...this.pActions,
      [actionName]: action,
    };

    return this;
  };

  public addStoreField = <K extends keyof StoreT>(name: K, initialValue: StoreT[K]) => {
    this.pInitialStore = { ...this.pInitialStore, [name]: initialValue };
    this.addSelector(name as keyof SelectorsT, (store: StoreT) => store[name]);
    return this;
  };

  public addSelector = <K extends keyof SelectorsT>(
    name: K,
    handler: (store: StoreT) => SelectorsT[K]
  ) => {
    this.pSelectors = {
      ...this.pSelectors,
      [name]: handler,
    };

    return this;
  };

  public setApi = (api: ApiT) => {
    this.pApi = api;
  };

  protected makeActionType(actionName: keyof ActionsT) {
    return `${this.moduleName}/${this.subModuleName}/${actionName}`;
  }
}
