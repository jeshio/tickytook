import { IArticle } from 'modules/Blog/List';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { UImage } from 'src/ui-components/UImage';

export interface IArticleProps extends IArticle {}

export function Article(props: IArticleProps) {
  return (
    <Link to={`/articles/${props.slug}`}>
      <h3>{props.title}</h3>

      <UImage src={props.logo.url} alt={props.logo.title} height="120px" />
    </Link>
  );
}
