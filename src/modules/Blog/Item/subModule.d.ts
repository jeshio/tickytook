import ICPropsWithStore from 'src/core/interfaces/ICPropsWithStore';
import { Store } from '..';

declare module 'modules/Blog/Item' {
  interface ISelectors extends Store.ISelectors {}

  interface IActions extends Store.IActions {}

  interface IProps extends ICPropsWithStore<ISelectors, IActions> {}
}
