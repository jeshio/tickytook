import * as React from 'react';
import { Button, PropTypes } from 'rsuite';
import { ButtonProps } from 'rsuite/types/Button';
import styled from 'styled-components';
import { color, space, SpaceProps } from 'styled-system';

interface IUButtonProps extends ButtonProps, SpaceProps {
  noBg?: boolean;
}

const noBgProps = {
  appearance: 'ghost' as PropTypes.Appearance,
  style: {
    border: 'unset',
    color: 'inherit',
  },
};

const StyledButton = styled.button`
  ${space};
  ${color};
`;

const UButton: React.FunctionComponent<IUButtonProps> = ({ noBg, ...props }) => {
  return <Button {...props} componentClass={StyledButton} {...(noBg ? noBgProps : {})} />;
};

UButton.defaultProps = {
  noBg: false,
};

export default UButton;
