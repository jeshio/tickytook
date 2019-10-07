import cn from 'classnames';
import { darken, lighten } from 'polished';
import * as React from 'react';
import { Button, PropTypes } from 'rsuite';
import { ButtonProps } from 'rsuite/types/Button';
import displayWithVisibleChecking from 'src/core/extends/styled-system/displayWithVisibleChecking';
import { VisibleProps } from 'src/core/extends/styled-system/interfaces';
import TTheme from 'src/core/types/TTheme';
import styled from 'styled-components';
import { color, space, SpaceProps } from 'styled-system';
import UIcon from './UIcon';

export interface IUButtonProps extends ButtonProps, SpaceProps, VisibleProps {
  noBg?: boolean;
  extraText?: string;
  icon?: ReturnType<typeof UIcon>;
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
  ${displayWithVisibleChecking};
  ${space};
  ${color};
  font-size: 1rem;
  font-weight: 200;
  border-radius: 3rem;
  padding: 0.5rem 1.1rem;

  &.rs-btn-primary {
    background-color: ${props => (props.theme as TTheme).colors.green};

    &:hover {
      background-color: ${props => darken(0.05, (props.theme as TTheme).colors.green)};
    }
  }

  &.rs-btn-ghost {
    font-weight: 400;
  }

  &.rs-btn-link {
    color: ${props => (props.theme as TTheme).designColors.link};
    font-weight: 400;
    padding: 0.05rem 0.5rem;

    svg {
      fill: ${props => (props.theme as TTheme).designColors.link};
    }
  }

  &.rs-btn-blue {
    background-color: ${props => (props.theme as TTheme).colors.blue};

    &:hover {
      background-color: ${props => darken(0.05, (props.theme as TTheme).colors.blue)};
    }
  }

  &.rs-btn-ghost.rs-btn-active.rs-btn-focus,
  &.rs-btn-ghost.rs-btn-active:focus,
  &.rs-btn-ghost:active.rs-btn-focus,
  &.rs-btn-ghost:active:focus,
  &.rs-open > .rs-dropdown-toggle.rs-btn-ghost.rs-btn-focus,
  &.rs-open > .rs-dropdown-toggle.rs-btn-ghost:focus,
  &.rs-btn-ghost {
    color: ${props => (props.theme as TTheme).colors.blue};
    border-color: ${props => (props.theme as TTheme).colors.blue};
    transition: 0.25s all;

    svg {
      transition: 0.25s all;
      fill: ${props => (props.theme as TTheme).colors.blue};
    }

    &:hover {
      color: ${props => darken(0.05, (props.theme as TTheme).colors.blue)};
      border-color: ${props => darken(0.05, (props.theme as TTheme).colors.blue)};

      svg {
        fill: ${props => darken(0.05, (props.theme as TTheme).colors.blue)};
      }
    }
  }

  svg {
    fill: white;
  }
`;

const Inner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExtraText = styled.div`
  font-size: 0.75rem;
  margin-top: -4px;
`;

const UButton: React.FunctionComponent<IUButtonProps> = ({ noBg, extraText, icon, ...props }) => {
  return (
    <StyledButton
      {...props}
      className={cn(props.className, 'u-override')}
      {...(noBg ? noBgProps(props) : {})}
    >
      <Inner>
        {icon}
        <span
          style={
            icon
              ? {
                  paddingLeft: props.children ? '5px' : 0,
                }
              : { display: 'block', width: '100%' }
          }
        >
          {props.children}
          {extraText && <ExtraText>{extraText}</ExtraText>}
        </span>
      </Inner>
    </StyledButton>
  );
};

UButton.defaultProps = {
  display: 'inline',
  noBg: false,
};

export default UButton;
