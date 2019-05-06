import * as React from 'react';
import styled, { css } from 'styled-components';
import { display, maxHeight, MaxHeightProps } from 'styled-system';
import UBlock, { IUBlockProps } from './UBlock';

interface IUBlockLimitedHeightProps extends IUBlockProps, MaxHeightProps {
  maxBorderHeight?: number;
}

interface IUBlockLimitedHeightState {
  topBorderHeight: number;
  bottomBorderHeight: number;
}

const extraStyles = css`
  overflow-y: auto;
  ${maxHeight};
`;

const Root = styled.div<IUBlockLimitedHeightState>`
  position: relative;
  ${display};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: ${props => `${props.topBorderHeight}px`};
    background-color: rgba(255, 255, 255, 0);
    background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
    z-index: 1;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: ${props => `${props.bottomBorderHeight}px`};
    background-color: rgba(255, 255, 255, 0);
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));
    pointer-events: none;
  }
`;

class UBlockLimitedHeight extends React.PureComponent<
  IUBlockLimitedHeightProps,
  IUBlockLimitedHeightState
> {
  public static defaultProps = {
    maxHeight: '300px',
    maxBorderHeight: 40,
  };

  private blockRef = React.createRef<HTMLDivElement>();

  constructor(props: IUBlockLimitedHeightProps) {
    super(props);

    this.state = {
      topBorderHeight:
        this.props.maxBorderHeight || UBlockLimitedHeight.defaultProps.maxBorderHeight,
      bottomBorderHeight:
        this.props.maxBorderHeight || UBlockLimitedHeight.defaultProps.maxBorderHeight,
    };
  }

  public componentDidMount() {
    try {
      (this.blockRef.current as any).addEventListener('scroll', this.onScrollBlock);
      window.addEventListener('resize', this.onScrollBlock);
    } catch (e) {}
    this.onScrollBlock();
  }

  public componentDidUpdate() {
    this.onScrollBlock();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onScrollBlock);
    try {
      (this.blockRef.current as any).removeEventListener('scroll', this.onScrollBlock);
    } catch (e) {}
  }

  public render() {
    return (
      <Root
        {...this.props}
        topBorderHeight={this.state.topBorderHeight}
        bottomBorderHeight={this.state.bottomBorderHeight}
      >
        <UBlock {...this.props} css={extraStyles} ref={this.blockRef} />
      </Root>
    );
  }

  private onScrollBlock = () => {
    if (!this.blockRef.current) {
      return;
    }
    const { maxBorderHeight } = this.props;
    const blockDiv = this.blockRef.current || ({} as any);
    const distanceToTop = blockDiv.scrollTop || 0;
    const scrollHeight = blockDiv.scrollHeight || 0;
    const blockRect = blockDiv.getBoundingClientRect();

    this.setState({
      topBorderHeight: Math.min(distanceToTop, maxBorderHeight || 0),
      bottomBorderHeight: Math.min(
        scrollHeight - blockRect.height - distanceToTop,
        maxBorderHeight || 0
      ),
    });
  };
}

export default UBlockLimitedHeight;
