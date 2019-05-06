import * as React from 'react';
import styled from 'styled-components';
import { height, HeightProps, width, WidthProps } from 'styled-system';
import { Omit } from 'utility-types';

export interface IUImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'height' | 'width'>,
    HeightProps,
    WidthProps {}

const Image = styled(({ width: a, height: b, ...props }) => <img {...props} />)`
  ${height};
  ${width};
`;

export function UImage(props: IUImageProps) {
  return <Image {...props} />;
}
