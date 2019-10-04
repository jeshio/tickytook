import ICAction from './ICAction';

export default interface ICApiAction<
  Parameters extends any[] = any[],
  SuccessParameters extends any[] = any[],
  FailureParameters extends any[] = any[]
> {
  request: (...args: Parameters) => ICAction<Parameters>;
  success: (...args: SuccessParameters) => ICAction<SuccessParameters>;
  failure: (...args: FailureParameters) => ICAction<FailureParameters>;
}
