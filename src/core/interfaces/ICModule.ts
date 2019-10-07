export default interface ICModule {
  MODULE_NAME: string;
  Store?: {
    selectors: any;
    actions: any;
    reducers: any;
    rootSaga?: () => any;
  };
}
