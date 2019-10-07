export default interface ICActionPromise {
  resolve: (...args: any[]) => any;
  reject: (...args: any[]) => any;
}
