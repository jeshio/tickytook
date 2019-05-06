import * as React from 'react';
import { Checkbox } from 'rsuite';
import { CheckboxProps } from 'rsuite/types/Checkbox';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';

const StyledCheckbox = styled(Checkbox)`
  .rs-checkbox-checker {
    padding-top: 0.8rem;
    padding-left: 2.8rem;
  }

  .rs-checkbox-wrapper {
    .rs-checkbox-inner {
      &::before {
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 5px;
        border: unset;
      }
      &::after {
        transition: unset;
        transform: rotate(45deg) scale(1.7);
        margin-top: 6px;
        margin-left: 9px;
        border-color: ${props => (props.theme as TTheme).colors.lightGreen};
      }
    }
  }
`;

export interface IUCheckboxProps extends CheckboxProps {}

const UCheckbox: React.FunctionComponent<IUCheckboxProps> = props => {
  return <StyledCheckbox {...props} />;
};

export default UCheckbox;
