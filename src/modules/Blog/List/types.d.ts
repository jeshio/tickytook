import { Store } from '.';

declare module 'modules/Blog/List' {
  interface Selectors extends Store.ISelectors {}

  interface Actions extends Store.IActions {}

  interface IArticle {
    title: string;
    logo: {
      url: string;
      title: string;
    };
    text: string;
  }
}
