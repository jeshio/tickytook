import IStringIndexes from '../interfaces/IStringIndexes';
import { AddTypeToKeys } from '../util-types/AddTypeToKeys';
import ICAction from './interfaces/ICAction';
import ICStore from './interfaces/ICStore';
import { TReducer } from './types/TReducer';
import makeReducersByKeys from './utils/makeReducerByKeys';

export default class BaseStore<
  StoreT extends ICStore,
  A extends IStringIndexes,
  SelectorsT extends IStringIndexes,
  ActionsT = AddTypeToKeys<A, { type: string }>
> {
  protected moduleName: string;
  protected subModuleName: string;
  protected reducersList: Array<TReducer<StoreT, any>> = [];
  protected actionTypes: string[] = [];
  protected pActions: ActionsT = {} as ActionsT;
  protected pSelectors: SelectorsT = {} as SelectorsT;
  protected initialStore: StoreT = {} as StoreT;

  constructor(moduleName: string, subModuleName: string) {
    this.moduleName = moduleName;
    this.subModuleName = subModuleName;
    this.addAction = this.addAction.bind(this);
    this.addStoreField = this.addStoreField.bind(this);
  }

  public get actions() {
    return this.pActions;
  }

  public selectors = (store: StoreT): SelectorsT => {
    return Object.keys(this.pSelectors).reduce(
      (base, selectorName: string) => ({
        ...base,
        [selectorName]: this.pSelectors[selectorName](store[this.moduleName][this.subModuleName]),
      }),
      {}
    ) as SelectorsT;
  };

  public reducers = (store = this.initialStore, action: ICAction) => {
    return this.reducersList.reduce(
      (currentStore: StoreT, reducer: TReducer<StoreT>) => reducer(currentStore, action),
      store
    );
  };

  public addAction = <K extends keyof A>(
    actionName: K,
    reducer: TReducer<StoreT, Parameters<A[K]>>
  ) => {
    const modelActionType = this.makeActionType(actionName);
    const action = (...args: Parameters<A[K]>): ICAction<Parameters<A[K]>> => ({
      payload: args,
      type: modelActionType,
    });
    action.type = modelActionType;
    this.actionTypes.push(modelActionType);
    this.reducersList.push(
      makeReducersByKeys<StoreT, Parameters<A[K]>>({
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
    this.initialStore = { ...this.initialStore, [name]: initialValue };
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

  protected makeActionType(actionName: keyof A) {
    return `${this.moduleName}/${this.subModuleName}/${actionName}`;
  }
}
