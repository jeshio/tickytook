import truncate from 'lodash/truncate';
import * as React from 'react';
import Helmet from 'react-helmet';

export interface IUHelmetProps extends React.PropsWithChildren<{}> {
  title?: string;
  description?: string;
}

export default class UHelmet extends React.PureComponent<IUHelmetProps> {
  get title() {
    if (!this.props.title) {
      return <title>Тикитук — наколдуй хэштеги, генератор хэштегов одним кликом</title>;
    }

    return (
      <title>
        {truncate(this.props.title, {
          length: 29,
          omission: '..',
        })}{' '}
        • генератор хэштегов Тикитук
      </title>
    );
  }

  get description() {
    const content =
      this.props.description ||
      '20 хэштегов за один клик, попробуй! Волшебник Тикитук подберёт лучшие хэштеги для твоих постов в Instagram и других соцсетях.';

    return <meta name="description" content={content} />;
  }

  public build = () => {
    const result = [];

    result.push(this.title);

    result.push(this.description);

    return result;
  };

  public render() {
    return (
      <Helmet>
        {this.build()}
        {this.props.children}
      </Helmet>
    );
  }
}
