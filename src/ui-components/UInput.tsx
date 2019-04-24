import * as React from 'react';
import { Input as RInput } from 'rsuite';
import { InputProps } from 'rsuite/types/Input';
import styled from 'styled-components';

export interface IUInputProps extends InputProps {
  label?: string;
}

const Label = styled.span`
  position: absolute;
  text-transform: lowercase;
  font-size: 0.8rem;
  bottom: -14px;
  right: 4px;
`;

const UInput: React.FunctionComponent<IUInputProps> = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <RInput {...props} />
      <Label>{label}</Label>
    </React.Fragment>
  );
};

export default UInput;
