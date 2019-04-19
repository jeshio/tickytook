export default interface ICAction<PayloadT = any> {
  type: string;
  payload: PayloadT;
}
