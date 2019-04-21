import ApiService from 'src/core/services/ApiService';
import { IEndPoints } from './interfaces';

const Api = new ApiService<IEndPoints>();

Api.addEndPoint('extraWords', {
  failureResponse: response => ({ error: 'test' }),
  method: 'get',
  successResponse: response => response,
  url: 'http://localhost:4004/extra-words',
});

export default Api;
