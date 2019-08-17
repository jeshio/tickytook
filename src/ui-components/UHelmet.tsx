import truncate from 'lodash/truncate';
import * as React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router';
import { JSON_LD } from 'src/config';
import ICJsonLd from 'src/core/interfaces/ICJsonLd';

export interface IUHelmetProps extends React.PropsWithChildren<{}>, RouteComponentProps<{}> {
  title?: string;
  description?: string;
  logoUrl?: string;
  ogType?: 'website' | 'article' | 'book' | 'profile' | string;
  jsonLds?: ICJsonLd[];
}

class UHelmet extends React.PureComponent<IUHelmetProps> {
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
    const { jsonLds } = this.props;

    return [
      <script type="application/ld+json" key="jsonLd">
        {JSON.stringify(JSON_LD)}
      </script>,
    ].concat(
      (jsonLds || []).map(jsonLd => (
        <script type="application/ld+json" key="jsonLd">
          {JSON.stringify(jsonLd)}
        </script>
      ))
    );
  }

  get openGraph() {
    const { title, description } = this;
    const {
      ogType,
      logoUrl,
      location: { pathname },
    } = this.props;

    return [
      <meta property="og:locale" key="og:locale" content="ru_RU" />,
      <meta property="og:type" key="og:type" content={ogType || 'website'} />,
      <meta property="og:title" key="og:title" content={title} />,
      <meta
        property="og:description"
        key="og:description"
        content={truncate(description, { length: 180 })}
      />,
      <meta property="og:url" key="og:url" content={pathname} />,
      <meta property="og:site_name" key="og:site_name" content="Тикитук" />,
      logoUrl && <meta property="og:image" key="og:image" content={logoUrl} />,
      <meta property="og:image" key="og:image1" content="https://tickytook.ru/logo-sm.png" />,
      <meta property="og:image" key="og:image2" content={JSON_LD.logo} />,
    ];
  }

  get socialsScheme() {
    const { title, description } = this;
    const { ogType: type, logoUrl } = this.props;

    return [
      <meta property="vk:image" key="vk:image" content="https://tickytook.ru/logo-sm.png" />,
      logoUrl && <meta property="vk:image" key="vk:image2" content={logoUrl} />,
      <meta name="twitter:card" key="twitter:card" content="summary" />,
      <meta name="twitter:title" key="twitter:title" content={title} />,
      <meta name="twitter:description" key="twitter:description" content={description} />,
      logoUrl && <meta name="twitter:image" key="twitter:image" content={logoUrl} />,
    ];
  }

  public build = () => {
    const { children } = this.props;
    const result = [];

    result.push(<title key="title">{this.title}</title>);

    result.push(<meta name="description" content={this.description} key="description" />);

    result.push(this.jsonLd);

    result.push(this.openGraph);

    result.push(this.socialsScheme);

    if (children) {
      result.push(children);
    }

    return result;
  };

  public render() {
    return <Helmet>{this.build()}</Helmet>;
  }
}

export default withRouter(UHelmet);
