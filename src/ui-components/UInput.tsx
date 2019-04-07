import * as React from 'react';
import { Input as RInput } from 'rsuite';
import { InputProps } from 'rsuite/types/Input';

export interface IUInputProps extends InputProps {}

const UInput: React.FunctionComponent<IUInputProps> = props => {
  return <RInput {...props} />;
};

export default UInput;
