import { lighten } from 'polished';
import React from 'react';
import TTheme from 'src/core/types/TTheme';
import styled, { keyframes, withTheme } from 'styled-components';

interface WithInChildrenLoaderProps {
  loading?: boolean;
}

const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.span`
  transition: 0.3s opacity;
  opacity: ${(props: any) => (props.visible ? 1 : 0)};

  & > div {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    display: block;
    width: 20px;
    height: 20px;
    margin: 6px;
    border: 2px solid;
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props: TTheme) =>
      `${lighten(0.1, props.colors.blue)} transparent transparent transparent`};

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const LoaderComponent = withTheme(({ theme, visible }) => (
  <Loader {...theme as any} visible={visible}>
    <div />
    <div />
    <div />
    <div />
  </Loader>
));

export default function withInChildrenLoader<P extends object>(Component: React.ComponentType<P>) {
  return class WithLoading extends React.Component<P & WithInChildrenLoaderProps> {
    public render() {
      const { loading, children, ...props } = this.props;

      return (
        <Component
          {...props as P}
          style={{ ...((props as any).style || {}), position: 'relative' }}
        >
          {children}
          <LoaderComponent visible={loading} />
        </Component>
      );
    }
  };
}
