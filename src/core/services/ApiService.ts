import axios, { AxiosRequestConfig } from 'axios';
import { CANCEL } from 'redux-saga';
import ICEndPoint from '../interfaces/ICEndPoint';
import ICEndPoints from '../interfaces/ICEndPoints';

export default class ApiService<TEndPoints extends ICEndPoints> {
  public get endPoints() {
    return Object.keys(this.pEndPoints).reduce((base, name) => {
      const endPoint = this.pEndPoints[name];
      const { url, method } = endPoint;
      let request: (params: any) => any = () => {};

      if (method === 'post') {
        request = (data: typeof endPoint.data = {}) =>
          this.request(
            {
              method,
              data,
              url,
            },
            endPoint
          );
      } else {
        request = (params: typeof endPoint.params = {}) =>
          this.request(
            {
              method,
              params,
              url,
            },
            endPoint
          );
      }

      return { ...base, [name]: request };
    }, {}) as {
      [P in keyof TEndPoints]: ((
        args: 'post' extends TEndPoints[P]['method']
          ? TEndPoints[P]['data']
          : TEndPoints[P]['params']
      ) => Promise<
        ReturnType<TEndPoints[P]['successResponse']> & ReturnType<TEndPoints[P]['failureResponse']>
      >)
    };
  }
  protected pEndPoints: TEndPoints = {} as TEndPoints;

  public addEndPoint<K extends keyof TEndPoints>(name: K, endPoint: TEndPoints[K]) {
    this.pEndPoints[name] = endPoint;
  }

  protected request = (axiosConfig: AxiosRequestConfig = {}, endPoint: ICEndPoint<{}>) => {
    const cancelSource = axios.CancelToken.source();

    const result: any = axios({
      cancelToken: cancelSource.token,
      ...axiosConfig,
    })
      .then(r => endPoint.successResponse(r.data))
      .catch(e => endPoint.failureResponse(e));

    result[CANCEL] = cancelSource.cancel;

    return result;
  };
}
