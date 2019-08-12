export default interface ICJsonLd {
  '@context'?: 'https://schema.org';
  '@type'?: string;
  name?: string;
  alternateName?: string;
  url?: string;
  logo?: string;
  sameAs?: string | string[];
  itemListElement?: Array<{
    '@type': string;
    position: number;
    item: {
      '@id': string;
      name: string;
      image: string;
    };
  }>;
  mainEntityOfPage?: {
    '@type': string;
    '@id': string;
  };
  headline?: string;
  description?: string;
  image?: {
    '@type': string;
    url: string;
    width?: number;
    height?: number;
  };
  author?: {
    '@type': string;
    name: string;
  };
  publisher?: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
      width?: number;
      height?: number;
    };
  };
  datePublished?: string;
  dateModified?: string;
}
