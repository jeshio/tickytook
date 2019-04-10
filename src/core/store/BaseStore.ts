import StringIndexes from '../interfaces/StringIndexes';
import CIAction from './interfaces/CIAction';
import CIStore from './interfaces/CIStore';
import { TReducer } from './types/TReducer';
import makeReducersByKeys from './utils/makeReducerByKeys';

export default class BaseStore<
  StoreT extends CIStore,
  ActionsT extends StringIndexes,
  SelectorsT extends StringIndexes
> {
  private moduleName: string;
  private subModuleName: string;
  private reducersList: Array<TReducer<StoreT, any>> = [];
  private actionTypes: string[] = [];
  private pActions: ActionsT = {} as ActionsT;
  private pSelectors: SelectorsT = {} as SelectorsT;
  private initialStore: StoreT = {} as StoreT;

  constructor(moduleName: string, subModuleName: string) {
    this.moduleName = moduleName;
    this.subModuleName = subModuleName;
    this.addScaffold = this.addScaffold.bind(this);
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

  public reducers = (store = this.initialStore, action: CIAction) => {
    return this.reducersList.reduce(
      (currentStore: StoreT, reducer: TReducer<StoreT>) => reducer(currentStore, action),
      store
    );
  };

  public addScaffold = (
    actionName: keyof ActionsT,
    reducer: TReducer<StoreT, Parameters<ActionsT[typeof actionName]>>
  ) => {
    const modelActionType = `${this.moduleName}/${this.subModuleName}/${actionName}`;
    this.actionTypes.push(modelActionType);
    this.reducersList.push(
      makeReducersByKeys<StoreT, Parameters<ActionsT[typeof actionName]>>({
        [modelActionType]: reducer,
      })
    );
    this.pActions = {
      ...this.pActions,
      [actionName]: (
        ...args: Parameters<ActionsT[typeof actionName]>
      ): CIAction<Parameters<ActionsT[typeof actionName]>> => ({
        payload: args,
        type: modelActionType,
      }),
    };

    return this;
  };

  public addStoreField = (name: keyof StoreT, initialValue: StoreT[typeof name]) => {
    this.initialStore = { ...this.initialStore, [name]: initialValue };
    this.pSelectors = {
      ...this.pSelectors,
      [name]: (store: StoreT) => store[name],
    };
    return this;
  };
}
