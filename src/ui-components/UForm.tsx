import * as React from 'react';
import { ControlLabel, Form, FormControl, FormGroup, HelpBlock } from 'rsuite';
import { ControlLabelProps } from 'rsuite/types/ControlLabel';
import { FormProps } from 'rsuite/types/Form';
import { FormControlProps } from 'rsuite/types/FormControl';
import { FormGroupProps } from 'rsuite/types/FormGroup';
import { HelpBlockProps } from 'rsuite/types/HelpBlock';
import UCheckbox, { IUCheckboxProps } from './UCheckbox';
import UInput, { IUInputProps } from './UInput';
import UTextarea, { IUTextareaProps } from './UTextarea';

interface IUFormProps extends FormProps {}

type UFormControlProps = Partial<FormControlProps> & {
  name: string;
};

type TUForm = React.FunctionComponent<IUFormProps> & {
  Input: React.ComponentType<UFormControlProps & IUInputProps>;
  Textarea: React.ComponentType<UFormControlProps & IUTextareaProps>;
  Checkbox: React.ComponentType<UFormControlProps & IUCheckboxProps>;
  Label: React.ComponentType<ControlLabelProps>;
  Group: React.ComponentType<FormGroupProps>;
  Help: React.ComponentType<HelpBlockProps>;
};

const UForm: TUForm = props => {
  return <Form {...props} />;
};

UForm.Input = props => <FormControl {...props} accepter={UInput} />;
UForm.Textarea = props => <FormControl {...props} accepter={UTextarea} />;
UForm.Checkbox = props => <FormControl {...props} accepter={UCheckbox} />;
UForm.Label = props => <ControlLabel {...props} />;
UForm.Group = props => <FormGroup {...props} />;
UForm.Help = props => <HelpBlock {...props} />;

export default UForm;
