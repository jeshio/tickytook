export default interface ICEndPoint<SuccessResponse, FailureResponse = {}, Params = {}, Data = {}> {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: Params;
  data?: Data;
  successResponse: (...args: any[]) => SuccessResponse;
  failureResponse: (...args: any[]) => FailureResponse;
}
