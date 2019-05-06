import * as React from 'react';
import UBlock, { IUBlockProps } from './UBlock';

export interface IUInlineProps extends Exclude<IUBlockProps, 'display'> {}

const UInline: React.FunctionComponent<IUInlineProps> = props => {
  return <UBlock {...props} display="inline" />;
};

export default UInline;
