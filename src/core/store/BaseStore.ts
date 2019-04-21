import ICStringIndexes from '../interfaces/ICStringIndexes';
import { AddTypeToKeys } from '../util-types/AddTypeToKeys';
import ICAction from './interfaces/ICAction';
import ICStore from './interfaces/ICStore';
import { TReducer } from './types/TReducer';
import makeReducersByKeys from './utils/makeReducerByKeys';

export default class BaseStore<
  StoreT extends ICStore,
  ActionsT extends ICStringIndexes,
  SelectorsT extends ICStringIndexes,
  ApiT = {},
  ActionsWithType = AddTypeToKeys<ActionsT, { type: string }>
> {
  protected moduleName: string;
  protected subModuleName: string;
  protected reducersList: Array<TReducer<StoreT, any>> = [];
  protected pActions: ActionsWithType = {} as ActionsWithType;
  protected pSelectors: SelectorsT = {} as SelectorsT;
  protected initialStore: StoreT = {} as StoreT;
  protected pApi: ApiT = {} as ApiT;

  constructor(
    moduleName: string,
    subModuleName: string,
    initial: {
      actions?: { [P in keyof ActionsT]?: TReducer<StoreT, Parameters<ActionsT[P]>> };
      selectors?: { [P in keyof SelectorsT]?: (store: StoreT) => SelectorsT[P] };
      fields?: Partial<StoreT>;
    } = {}
  ) {
    this.moduleName = moduleName;
    this.subModuleName = subModuleName;
    this.addAction = this.addAction.bind(this);
    this.addStoreField = this.addStoreField.bind(this);
    if (initial.actions) {
      const { actions } = initial;
      Object.keys(actions).map(actionName =>
        this.addAction(actionName, actions[actionName] as ActionsT[typeof actionName])
      );
    }
    if (initial.selectors) {
      const { selectors } = initial;
      Object.keys(selectors).map(selectorName =>
        this.addSelector(selectorName, selectors[selectorName] as SelectorsT[typeof selectorName])
      );
    }
    if (initial.fields) {
      const { fields } = initial;
      Object.keys(fields).map(fieldName => this.addStoreField(fieldName, fields[fieldName]));
    }
  }

  public get actions() {
    return this.pActions;
  }

  public get api() {
    return this.pApi;
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

  public addAction = <K extends keyof ActionsT>(
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

  public setApi = (api: ApiT) => {
    this.pApi = api;
  };

  protected makeActionType(actionName: keyof ActionsT) {
    return `${this.moduleName}/${this.subModuleName}/${actionName}`;
  }
}
