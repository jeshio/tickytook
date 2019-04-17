import * as React from 'react';
import { Checkbox } from 'rsuite';
import { CheckboxProps } from 'rsuite/types/Checkbox';

export interface IUCheckboxProps extends CheckboxProps {}

const UCheckbox: React.FunctionComponent<IUCheckboxProps> = props => {
  return <Checkbox {...props} />;
};

export default UCheckbox;
