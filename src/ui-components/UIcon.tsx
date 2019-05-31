import * as React from 'react';
import styled from 'styled-components';
import { UImage } from './UImage';

type TIconSize = 'small' | 'medium' | 'large';

export interface IUIconProps {
  src?: string;
  svg?: React.ComponentType<any>;
  svgProps?: React.HTMLProps<HTMLOrSVGElement>;
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
    svgProps,
    ...props
  }: {
    Component: React.ComponentType<any>;
    svgProps?: React.HTMLProps<HTMLOrSVGElement>;
  }) => <Component {...svgProps || {}} {...props} />
)`
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
`;

const UIcon: React.FunctionComponent<IUIconProps> = props => {
  const size = {
    width: getSize(props.size as TIconSize),
    height: getSize(props.size as TIconSize),
  };
  return props.svg ? (
    <Icon Component={props.svg} svgProps={props.svgProps} {...size} />
  ) : (
    <UImage src={props.src} {...size} />
  );
};

UIcon.defaultProps = {
  size: 'medium',
};

export default UIcon;
