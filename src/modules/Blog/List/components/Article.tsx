import { IArticle } from 'modules/Blog/List';
import { rgba } from 'polished';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ICWithTheme from 'src/core/interfaces/ICWithTheme';
import { UImage } from 'src/ui-components/UImage';
import styled from 'styled-components';

export interface IArticleProps extends IArticle {}

const Root = styled(Link)`
  overflow: hidden;
  border-radius: 5px;
  position: relative;

  &:hover {
    .c-description {
      background-color: ${({ theme }: ICWithTheme) => rgba(theme.colors.blue, 0.95)};
    }

    .c-short-description {
      -webkit-line-clamp: 99;
      max-height: unset;
    }

    .c-logo {
      transform: scale(1.1);
    }
  }
`;

const Logo = styled(UImage)`
  object-fit: cover;
  transform: scale(1);
  transition: 0.25s transform;
  min-height: 330px;
  background-color: ${({ theme }: ICWithTheme) => rgba(theme.colors.blue, 0.8)};
`;

const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }: ICWithTheme) => rgba(theme.colors.blue, 0.8)};
  color: #fff;
  padding: 1rem;
  transition: 0.25s background-color;
  font-weight: 300;
`;

const Title = styled.h3`
  margin: 0;
`;

const ShortDescription = styled.p`
  margin-top: 0.5rem;
  hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  overflow: hidden;
  display: -webkit-box;
  max-height: 67px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const getShortDescriptionComponent = (shortDescription?: string) =>
  shortDescription ? (
    <ShortDescription className="c-short-description">{shortDescription}</ShortDescription>
  ) : null;

export function Article(props: IArticleProps) {
  return (
    <Root to={`/articles/${props.slug}`}>
      <Logo
        src={props.logo.url}
        alt={props.logo.title}
        className="c-logo"
        width="100%"
        height="100%"
      />
      <Description className="c-description">
        <Title>{props.title}</Title>
        {getShortDescriptionComponent(props.shortDescription)}
      </Description>
    </Root>
  );
}
