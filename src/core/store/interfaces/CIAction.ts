export default interface CIAction<PayloadT = any> {
  type: string;
  payload: PayloadT;
}
