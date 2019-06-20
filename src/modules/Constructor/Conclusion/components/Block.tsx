import * as React from 'react';
import displayWithVisibleChecking from 'src/core/extends/styled-system/displayWithVisibleChecking';
import withInChildrenLoader from 'src/core/hocs/withInChildrenLoader';
import TTheme from 'src/core/types/TTheme';
import UBlock, { IUBlockProps } from 'src/ui-components/UBlock';
import UStep from 'src/ui-components/UStep';
import USubTitle from 'src/ui-components/USubTitle';
import styled from 'styled-components';
import { borderRadius, BorderRadiusProps, padding } from 'styled-system';

interface IBlockProps extends React.PropsWithChildren<{}> {
  title?: string;
  header?: React.ReactNode;
  stepNumber?: number;
  loading?: boolean;
  className?: string;
}

const Root = styled(UBlock)`
  background-color: #fff;
  flex: 1;
  overflow: hidden;
`;

const Head = styled<any>(USubTitle)`
  position: relative;
  border-bottom: 1px solid;
  border-color: ${props => (props.theme as TTheme).designColors.background};
  margin: 0;
  text-align: center;
  height: 47px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const HeadContent = styled(withInChildrenLoader(UBlock))`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 6px;
  padding-top: 6px;
`;

const Step = styled(UStep)`
  ${displayWithVisibleChecking};
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const Block: React.FunctionComponent<IBlockProps> = props => {
  const withStepNumber = props.stepNumber !== undefined;
  return (
    <Root className={props.className} mb={3} borderRadius={[0, '5px']}>
      {props.title && (
        <Head>
          <Step visible={withStepNumber}>{props.stepNumber}</Step>
          <HeadContent px={1} loading={props.loading}>
            {props.title}
            {props.header}
          </HeadContent>
        </Head>
      )}
      <UBlock p={2} paddingBottom={4}>
        {props.children}
      </UBlock>
    </Root>
  );
};

export default Block;
