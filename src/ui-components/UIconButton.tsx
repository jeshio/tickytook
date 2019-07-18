import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';
import UButton, { IUButtonProps } from './UButton';
import UIcon, { IUIconProps } from './UIcon';

interface IUIconButtonProps extends IUButtonProps, Pick<IUIconProps, 'src' | 'svg'> {}

const Root = styled(UButton)`
  &.u-icon-override {
    padding: 10px;
  }

  @media (min-width: ${({ theme }: { theme: TTheme }) => theme.breakpoints.md}) {
    padding: 7px;
  }

  svg {
    transform: scale(1.2);

    @media (min-width: ${({ theme }: { theme: TTheme }) => theme.breakpoints.md}) {
      transform: unset;
    }
  }
`;

const UIconButton: React.FunctionComponent<IUIconButtonProps> = ({ src, svg, ...props }) => {
  return (
    <Root
      {...props}
      className={`${props.className} u-icon-override`}
      icon={<UIcon src={src} svg={svg} size="medium" />}
    />
  );
};

export default UIconButton;
