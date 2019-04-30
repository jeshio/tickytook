import * as React from 'react';
import Textarea from 'react-textarea-autosize';
import UInput, { IUInputProps } from './UInput';

export interface IUTextareaProps extends IUInputProps {
  autoHeight?: boolean;
}

const componentClass = React.forwardRef((props: React.HTMLProps<HTMLTextAreaElement>, ref) => (
  <Textarea
    {...props as any}
    style={{ ...(props.style || {}), minHeight: 'unset', minWidth: 'unset' }}
    ref={ref}
  />
));

const UTextarea: React.FunctionComponent<IUTextareaProps> = ({ autoHeight, ...props }) => {
  return <UInput {...props} componentClass={componentClass} />;
};

UTextarea.defaultProps = {
  autoHeight: false,
};

export default UTextarea;
