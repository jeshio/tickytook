import * as React from 'react';
import { Input as RInput } from 'rsuite';
import { InputProps } from 'rsuite/types/Input';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';

export interface IUInputProps extends InputProps {
  label?: string;
}

const Label = styled.span`
  position: absolute;
  text-transform: lowercase;
  font-size: 0.8rem;
  bottom: -15px;
  right: 4px;
`;

const StyledRInput = styled(RInput)`
  border: unset;
  font-size: 0.85rem;
  line-height: 1.1rem;
  margin-bottom: ${props => (props.label ? '7px' : '0')};

  &::placeholder {
    color: ${props => (props.theme as TTheme).colors.grey};
  }

  &.rs-input,
  &.rs-input-number {
    width: 100%;
  }
`;

const UInput: React.FunctionComponent<IUInputProps> = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <StyledRInput label={label} {...props} />
      <Label>{label}</Label>
    </React.Fragment>
  );
};

export default UInput;
