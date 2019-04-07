import * as React from 'react';
import { Input as RInput } from 'rsuite';
import { InputProps } from 'rsuite/types/Input';

interface IInputProps extends InputProps {}

const Input: React.FunctionComponent<IInputProps> = props => {
  return <RInput {...props} />;
};

export default Input;
