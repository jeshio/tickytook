import { IArticle } from 'modules/Blog/List';
import * as React from 'react';
import ICWithTheme from 'src/core/interfaces/ICWithTheme';
import UBlock from 'src/ui-components/UBlock';
import { UImage } from 'src/ui-components/UImage';
import styled from 'styled-components';
import { space } from 'styled-system';

interface IShortDescriptionProps extends IArticle {}

const Root = styled(UBlock)`
  overflow: hidden;
`;

const Content = styled(UBlock)<any>`
  background-color: ${({ theme }: ICWithTheme) => theme.colors.blue};
  color: #fff;
  display: flex;
  align-items: center;
`;

const Title = styled.h1<any>`
  ${space};
  font-weight: 300;
`;

const Text = styled.p`
  font-weight: 300;
`;

const Image = styled(UImage)`
  object-fit: cover;
`;

const ShortDescription: React.FunctionComponent<IShortDescriptionProps> = props => {
  return (
    <Root display={['block', 'flex']} borderRadius={[0, '5px']}>
      <UBlock flex={1}>
        <Image src={props.logo.url} alt={props.logo.title} width="100%" height="100%" />
      </UBlock>
      <Content p={4} px={[5, 5, 7, 8]} flex={[1, 2, 3]}>
        <div>
          <Title my={[1, 2]} marginTop={[0, 2]}>
            {props.title}
          </Title>

          <Text>{props.shortDescription}</Text>
        </div>
      </Content>
    </Root>
  );
};

export default ShortDescription;
