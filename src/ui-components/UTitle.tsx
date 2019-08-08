import * as React from 'react';
import styled from 'styled-components';
import { fontSize } from 'styled-system';
import UBlock, { IUBlockProps } from './UBlock';

interface IUTitleProps extends React.HTMLProps<HTMLHeadingElement> {
  extraChildren?: React.ReactNode;
  rootProps?: IUBlockProps;
}

const Root = styled(UBlock)`
  background-color: #fff;
  border-radius: 5px;
`;

const Title = styled.h1<any>`
  margin: 0;
  ${fontSize};
`;

const UTitle: React.FunctionComponent<IUTitleProps> = ({
  ref,
  as,
  extraChildren,
  rootProps,
  ...props
}) => {
  return (
    <Root
      paddingLeft={[2, 4, 6]}
      padding={[3, 3, 4]}
      mx={[2, 0]}
      marginBottom={[2, 3, 4]}
      textAlign={['center', 'left']}
      {...(rootProps ? rootProps : {})}
    >
      <Title {...props} fontSize={[4, 4, '1.75rem']}>
        {props.children}
      </Title>
      {extraChildren}
    </Root>
  );
};

export default UTitle;
