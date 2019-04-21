import ICEndPoint from './ICEndPoint';

export default interface ICEndPoints {
  [key: string]: ICEndPoint<any, any, any>;
}
