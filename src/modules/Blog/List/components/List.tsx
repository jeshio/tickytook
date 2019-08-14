import { IArticle } from 'modules/Blog/List';
import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import UBlock from 'src/ui-components/UBlock';
import styled from 'styled-components';
import { Article } from './Article';

interface IListProps {
  items: IArticle[];
}

const Root = styled(UBlock)`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr;
  padding: 0.5rem;

  @media (min-width: ${({ theme }: { theme: TTheme }) => theme.breakpoints.sm}) {
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 1rem;
    padding: 0;
  }

  @media (min-width: ${({ theme }: { theme: TTheme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const List: React.FunctionComponent<IListProps> = ({ items, ...props }) => {
  return (
    <Root {...props}>
      {items.map(item => (
        <Article key={item.id} {...item} />
      ))}
    </Root>
  );
};

export default List;
