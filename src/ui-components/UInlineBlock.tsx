import * as React from 'react';
import UBlock, { IUBlockProps } from './UBlock';

export interface IUInlineProps extends Exclude<IUBlockProps, 'display'> {}

const UInlineBlock: React.FunctionComponent<IUInlineProps> = props => {
  return <UBlock {...props} display="inline-block" />;
};

export default UInlineBlock;
