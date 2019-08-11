import ICJsonLd from './core/interfaces/ICJsonLd';

const { REACT_APP_API_URL } = process.env;

export { REACT_APP_API_URL as API_URL };

export const JSON_LD: ICJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Тикитук',
  alternateName: 'Tickytook',
  url: 'https://tickytook.ru',
  logo: 'https://tickytook.ru/logo-icon.svg',
  sameAs: 'https://www.instagram.com/tickytook.app/',
};
