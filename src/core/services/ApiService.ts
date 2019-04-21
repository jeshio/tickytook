import axios from 'axios';
import ICEndPoints from '../interfaces/ICEndPoints';

export default class ApiService<TEndPoints extends ICEndPoints> {
  protected pEndPoints: TEndPoints = {} as TEndPoints;

  public get endPoints() {
    return Object.keys(this.pEndPoints).reduce((base, name) => {
      const endPoint = this.pEndPoints[name];
      const request = async (params: typeof endPoint.params = {}) => {
        const { url, method } = endPoint;
        return axios({
          method,
          params,
          url,
        });
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
