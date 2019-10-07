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

const DEFAULT_TITLE_TEXT = 'Тикитук — генератор хэштегов одним кликом';

const handleDynamicTitle = (title: string) =>
  `${truncate(title, {
    length: 48,
    omission: '..',
  })} • Тикитук`;

class UHelmet extends React.PureComponent<IUHelmetProps> {
  get title() {
    const { title } = this.props;
    if (!title) {
      return DEFAULT_TITLE_TEXT;
    }

    return handleDynamicTitle(title);
  }

  get description() {
    return (
      this.props.description ||
      '15 хэштегов за один клик, попробуй! Волшебник Тикитук подберёт лучшие хэштеги для твоих постов в Instagram и других соцсетях.'
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
      title: originalTitle,
      ogType,
      logoUrl,
      location: { pathname },
    } = this.props;

    return [
      <meta property="og:locale" key="og:locale" content="ru_RU" />,
      <meta property="og:type" key="og:type" content={ogType || 'website'} />,
      <meta property="og:title" key="og:title" content={originalTitle || title} />,
      <meta
        property="og:description"
        key="og:description"
        content={truncate(description, { length: 180 })}
      />,
      <meta property="og:url" key="og:url" content={pathname} />,
      <meta property="og:site_name" key="og:site_name" content="Тикитук" />,
      logoUrl && <meta property="og:image" key="og:image" content={logoUrl} />,
      <meta property="og:image" key="og:image1" content={JSON_LD.logo} />,
    ];
  }

  get socialsScheme() {
    const { title, description } = this;
    const { logoUrl, title: originalTitle } = this.props;

    return [
      logoUrl && <meta property="vk:image" key="vk:image" content={logoUrl} />,
      <meta property="vk:image" key="vk:image2" content={JSON_LD.logo} />,
      <meta name="twitter:card" key="twitter:card" content="summary" />,
      <meta name="twitter:title" key="twitter:title" content={originalTitle || title} />,
      <meta name="twitter:description" key="twitter:description" content={description} />,
      <meta name="twitter:image" key="twitter:image" content={JSON_LD.logo} />,
      logoUrl && <meta name="twitter:image" key="twitter:image1" content={logoUrl} />,
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
