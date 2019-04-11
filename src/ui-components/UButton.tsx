import * as React from 'react';
import { Button } from 'rsuite';
import { ButtonProps } from 'rsuite/types/Button';

interface IUButtonProps extends ButtonProps {}

const UButton: React.FunctionComponent<IUButtonProps> = props => {
  return <Button {...props} />;
};

export default UButton;
