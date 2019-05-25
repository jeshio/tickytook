import { API_URL } from 'src/config';
import ApiService from 'src/core/services/ApiService';
import { IEndPoints } from './interfaces';

const Api = new ApiService<IEndPoints>();

Api.addEndPoint('extraWords', {
  failureResponse: response => ({ error: 'test' }),
  method: 'post',
  successResponse: response => response,
  url: `${API_URL}/extra-words`,
});

export default Api;
