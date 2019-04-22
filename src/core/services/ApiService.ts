import axios from 'axios';
import { CANCEL } from 'redux-saga';
import ICEndPoints from '../interfaces/ICEndPoints';

export default class ApiService<TEndPoints extends ICEndPoints> {
  protected pEndPoints: TEndPoints = {} as TEndPoints;

  public get endPoints() {
    return Object.keys(this.pEndPoints).reduce((base, name) => {
      const endPoint = this.pEndPoints[name];
      const request = (params: typeof endPoint.params = {}) => {
        const cancelSource = axios.CancelToken.source();
        const { url, method } = endPoint;
        const result: any = axios({
          cancelToken: cancelSource.token,
          method,
          params,
          url,
        });
        result[CANCEL] = cancelSource.cancel;

        return result;
      };

      return { ...base, [name]: request };
    }, {}) as {
      [P in keyof TEndPoints]: (
        args: TEndPoints[P]['params']
      ) => Promise<
        ReturnType<TEndPoints[P]['successResponse']> & ReturnType<TEndPoints[P]['failureResponse']>
      >
    };
  }

  public addEndPoint<K extends keyof TEndPoints>(name: K, endPoint: TEndPoints[K]) {
    this.pEndPoints[name] = endPoint;
  }
}
