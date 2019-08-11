import truncate from 'lodash/truncate';
import * as React from 'react';
import Helmet from 'react-helmet';
import { JSON_LD } from 'src/config';
import ICJsonLd from 'src/core/interfaces/ICJsonLd';

export interface IUHelmetProps extends React.PropsWithChildren<{}> {
  title?: string;
  description?: string;
  logoUrl?: string;
  ogType?: 'website' | 'article' | 'book' | 'profile' | string;
  jsonLd?: ICJsonLd;
}

export default class UHelmet extends React.PureComponent<IUHelmetProps> {
  get title() {
    if (!this.props.title) {
      return 'Тикитук — наколдуй хэштеги, генератор хэштегов одним кликом';
    }

    return `${truncate(this.props.title, {
      length: 29,
      omission: '..',
    })} • генератор хэштегов Тикитук`;
  }

  get description() {
    return (
      this.props.description ||
      '20 хэштегов за один клик, попробуй! Волшебник Тикитук подберёт лучшие хэштеги для твоих постов в Instagram и других соцсетях.'
    );
  }

  get jsonLd() {
    const { jsonLd } = this.props;
    const content: ICJsonLd = { ...JSON_LD, ...(jsonLd ? jsonLd : {}) };

    return JSON.stringify(content);
  }

  get openGraph() {
    const { title, description } = this;
    const { ogType, logoUrl } = this.props;

    return [
      <meta property="og:locale" key="og:locale" content="ru_RU" />,
      <meta property="og:type" key="og:type" content={ogType || 'website'} />,
      <meta property="og:title" key="og:title" content={title} />,
      <meta
        property="og:description"
        key="og:description"
        content={truncate(description, { length: 90 })}
      />,
      <meta property="og:url" key="og:url" content={window.location.href} />,
      <meta property="og:site_name" key="og:site_name" content="Тикитук" />,
      logoUrl && <meta property="og:image" key="og:image" content={logoUrl} />,
      <meta property="og:image" key="og:image1" content="https://tickytook.ru/logo-sm.svg" />,
      <meta property="og:image" key="og:image2" content={JSON_LD.logo} />,
    ];
  }

  get twitterScheme() {
    const { title, description } = this;
    const { ogType: type, logoUrl } = this.props;

    return [
      <meta name="twitter:card" key="twitter:card" content="summary" />,
      <meta name="twitter:title" key="twitter:title" content={title} />,
      <meta name="twitter:description" key="twitter:description" content={description} />,
      <meta name="twitter:image" key="twitter:image" content={logoUrl || ''} />,
    ];
  }

  public build = () => {
    const { children } = this.props;
    const result = [];

    result.push(<title key="title">{this.title}</title>);

    result.push(<meta name="description" content={this.description} key="description" />);

    result.push(
      <script type="application/ld+json" key="jsonLd">
        {this.jsonLd}
      </script>
    );

    result.push(this.openGraph);

    result.push(this.twitterScheme);

    if (children) {
      result.push(children);
    }

    return result;
  };

  public render() {
    return <Helmet>{this.build()}</Helmet>;
  }
}
