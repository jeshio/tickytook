import StringIndexes from '../interfaces/StringIndexes';
import IAction from './interfaces/IAction';
import IStore from './interfaces/IStore';
import { TReducer } from './types/TReducer';
import makeReducersByKeys from './utils/makeReducerByKeys';

export default class BaseStore<StoreT extends IStore, ActionsT, SelectorsT> {
  private moduleName: string;
  private subModuleName: string;
  private reducersList: Array<TReducer<StoreT, any>> = [];
  private actionTypes: string[] = [];
  private pActions: ActionsT & StringIndexes = {} as ActionsT;
  private pSelectors: SelectorsT & StringIndexes = {} as SelectorsT;
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

  public reducers = (store = this.initialStore, action: IAction) => {
    return this.reducersList.reduce(
      (currentStore: StoreT, reducer: TReducer<StoreT>) => reducer(currentStore, action),
      store
    );
  };

  public addScaffold = <PayloadT>(actionName: string, reducer: TReducer<StoreT, PayloadT>) => {
    const modelActionType = `${this.moduleName}/${this.subModuleName}/${actionName}`;
    this.actionTypes.push(modelActionType);
    this.reducersList.push(makeReducersByKeys<StoreT, PayloadT>({ [modelActionType]: reducer }));
    this.actions[actionName] = (args: PayloadT | object = {}): IAction => ({
      payload: args,
      type: modelActionType,
    });

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
