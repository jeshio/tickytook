import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import UButton from './UButton';

interface IUHashtagProps {
  isDeleted?: boolean;
  onClick: (hashtag: string) => void;
  children: string;
}

const Root = styled.span<SpaceProps>`
  display: inline-block;
  color: ${(props: any) =>
    props.isDeleted ? (props.theme as TTheme).colors.grey : (props.theme as TTheme).colors.white};
  background-color: ${(props: any) =>
    props.isDeleted
      ? (props.theme as TTheme).colors.lightGrey
      : (props.theme as TTheme).colors.blue};
  ${space}
`;

const UHashtag: React.FunctionComponent<IUHashtagProps> = props => {
  const { children, onClick, ...restProps } = props;
  return (
    <Root {...restProps} px={3} py="2px" mb="1px" mr="1px">
      <UButton size="xs" m={0} p={0} noBg={true} onClick={onClick}>
        {children}
      </UButton>
    </Root>
  );
};

UHashtag.defaultProps = {
  isDeleted: false,
};

export default UHashtag;
