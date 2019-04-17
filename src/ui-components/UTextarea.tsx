import * as React from 'react';
import UInput, { IUInputProps } from './UInput';

export interface IUTextareaProps extends IUInputProps {}

const componentClass = (props: React.HTMLProps<HTMLTextAreaElement>) => <textarea {...props} />;

const UTextarea: React.FunctionComponent<IUTextareaProps> = props => {
  return <UInput {...props} componentClass={componentClass} />;
};

export default UTextarea;
