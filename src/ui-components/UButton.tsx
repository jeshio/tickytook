import * as React from 'react';
import { Button, PropTypes } from 'rsuite';
import { ButtonProps } from 'rsuite/types/Button';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';
import { color, space, SpaceProps } from 'styled-system';
import UIcon from './UIcon';

export interface IUButtonProps extends ButtonProps, SpaceProps {
  noBg?: boolean;
  extraText?: string;
  icon?: UIcon;
}

const noBgProps = (props: IUButtonProps) => ({
  appearance: 'ghost' as PropTypes.Appearance,
  style: {
    ...(props.style || {}),
    border: 'unset',
    color: 'inherit',
  },
});

const StyledButton = styled(Button)`
  ${space};
  ${color};
  font-size: 1rem;
  font-weight: 200;
  border-radius: 3rem;
  padding: 0.5rem 1.1rem;

  &.rs-btn-primary {
    background-color: ${props => (props.theme as TTheme).colors.green};
  }

  &.rs-btn-ghost {
    font-weight: 400;

    svg {
      fill: #34c3ff;
    }
  }

  &.rs-btn-link {
    color: ${props => (props.theme as TTheme).designColors.link};
    font-weight: 400;
  }

  svg {
    fill: white;
  }
`;

const Inner = styled.span`
  display: flex;
  align-items: center;
`;

const ExtraText = styled.div`
  font-size: 0.75rem;
  margin-top: -4px;
`;

const UButton: React.FunctionComponent<IUButtonProps> = ({ noBg, extraText, icon, ...props }) => {
  return (
    <StyledButton {...props} {...(noBg ? noBgProps(props) : {})}>
      <Inner>
        {icon}
        <span
          style={
            icon
              ? {
                  paddingLeft: '3px',
                  paddingBottom: '2px',
                }
              : {}
          }
        >
          {props.children}
          <ExtraText>{extraText}</ExtraText>
        </span>
      </Inner>
    </StyledButton>
  );
};

UButton.defaultProps = {
  noBg: false,
};

export default UButton;
