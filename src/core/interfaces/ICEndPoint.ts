export default interface ICEndPoint<Params, SuccessResponse, FailureResponse> {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: Params;
  successResponse: (...args: any[]) => SuccessResponse;
  failureResponse: (...args: any[]) => FailureResponse;
}
