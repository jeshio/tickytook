declare module 'modules/Blog' {
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
    hidden: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
