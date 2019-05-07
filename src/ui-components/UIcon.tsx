import * as React from 'react';
import styled from 'styled-components';
import { UImage } from './UImage';

type TIconSize = 'small' | 'medium' | 'large';

export interface IUIconProps {
  src?: string;
  svg?: React.ComponentType<any>;
  svgStyle?: React.HTMLProps<HTMLOrSVGElement>;
  size?: TIconSize;
}

const getSize = (size: TIconSize) => {
  switch (size) {
    case 'small':
      return '1rem';
    case 'large':
      return '2rem';
    case 'medium':
    default:
      return '1.5rem';
  }
};
const Icon = styled(
  ({
    Component,
    svgStyle,
    ...props
  }: {
    Component: React.ComponentType<any>;
    svgStyle?: React.HTMLProps<HTMLOrSVGElement>;
  }) => <Component {...svgStyle || {}} {...props} />
)``;

const UIcon: React.FunctionComponent<IUIconProps> = props => {
  const params = {
    width: getSize(props.size as TIconSize),
    height: getSize(props.size as TIconSize),
  };
  return props.svg ? (
    <Icon Component={props.svg} svgStyle={props.svgStyle} {...params} />
  ) : (
    <UImage src={props.src} {...params} />
  );
};

UIcon.defaultProps = {
  size: 'medium',
};

export default UIcon;
