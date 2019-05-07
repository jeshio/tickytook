import { lighten } from 'polished';
import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';
import { space } from 'styled-system';
import UButton from './UButton';

interface IUHashtagProps {
  isDeleted?: boolean;
  onClick?: (hashtag: string) => void;
  children: string | string[];
}

const Root = styled(({ isDeleted, ...props }) => <UButton {...props} />)`
  display: inline-block;
  border-radius: 0;
  font-weight: 300;
  transition: background-color 0.25s;
  ${space};

  &,
  &:active,
  &:focus,
  &:active:focus,
  &:hover,
  &:active:hover {
    color: ${(props: any) =>
      props.isDeleted ? (props.theme as TTheme).colors.grey : (props.theme as TTheme).colors.white};
    background-color: ${(props: any) =>
      props.isDeleted
        ? (props.theme as TTheme).colors.lightGrey
        : (props.theme as TTheme).colors.blue};
  }

  &:hover {
    background-color: ${(props: any) =>
      props.isDeleted
        ? (props.theme as TTheme).colors.lightGrey
        : lighten(0.05, (props.theme as TTheme).colors.blue)};
  }
`;

const UHashtag: React.FunctionComponent<IUHashtagProps> = props => {
  const { children, onClick, ...restProps } = props;
  return (
    <Root {...restProps} size="xs" px={3} py={1} mb="1px" mr="1px" onClick={onClick}>
      {children}
    </Root>
  );
};

UHashtag.defaultProps = {
  isDeleted: false,
};

export default UHashtag;
