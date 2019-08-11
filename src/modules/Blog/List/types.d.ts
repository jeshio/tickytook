import { Store } from '.';

declare module 'modules/Blog/List' {
  interface Selectors extends Store.ISelectors {}

  interface Actions extends Store.IActions {}

  interface IArticle {
    id: string;
    title: string;
    slug: string;
    logo: {
      url: string;
      title: string;
    };
    shortDescription?: string;
    text: string;
    createdAt: string;
    updatedAt: string;
  }
}
