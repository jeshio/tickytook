import * as React from 'react';
import styled from 'styled-components';
import UButton, { IUButtonProps } from './UButton';
import UIcon, { IUIconProps } from './UIcon';

interface IUIconButtonProps extends IUButtonProps, Pick<IUIconProps, 'src' | 'svg'> {}

const Root = styled(UButton)`
  padding: 7px;
`;

const UIconButton: React.FunctionComponent<IUIconButtonProps> = ({ src, svg, ...props }) => {
  return (
    <Root {...props}>
      <UIcon src={src} svg={svg} />
    </Root>
  );
};

export default UIconButton;
