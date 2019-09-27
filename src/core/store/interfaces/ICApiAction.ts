import ICAction from './ICAction';

export default interface ICApiAction<
  Parameters extends any[],
  SuccessParameters extends any[] = [],
  FailureParameters extends any[] = []
> {
  request: (...args: Parameters) => ICAction<Parameters>;
  success: (...args: SuccessParameters) => ICAction<SuccessParameters>;
  failure: (...args: FailureParameters) => ICAction<FailureParameters>;
}
