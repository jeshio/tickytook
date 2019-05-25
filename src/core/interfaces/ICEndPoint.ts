export default interface ICEndPoint<Params, SuccessResponse, FailureResponse, Data = {}> {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: Params;
  data?: Data;
  successResponse: (...args: any[]) => SuccessResponse;
  failureResponse: (...args: any[]) => FailureResponse;
}
