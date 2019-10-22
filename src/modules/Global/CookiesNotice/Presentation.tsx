import * as React from 'react';
import { ReactComponent as CloseIconComponent } from 'src/images/components/icons/close.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UIcon from 'src/ui-components/UIcon';
import styled from 'styled-components';

interface IPresentationProps {
  onClickClose: () => void;
}

const Root = styled(UBlock)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
`;

const Button = styled(UButton)`
  position: absolute;
  right: 0;
  top: 0;

  svg {
    fill: #aaa;
  }
`;

const Presentation: React.FunctionComponent<IPresentationProps> = props => {
  return (
    <Root p={4}>
      <UBlock maxWidth="1150px" mx="auto" px={2} position="relative">
        <UBlock paddingRight="40px">
          Этот сайт использует файлы cookies. Продолжая работу с этим сайтом Вы соглашаетесь на их
          использование. Более подробнее о Политике использования файлов куки см. здесь{' '}
          <a href="/policy" target="_blank">
            Пользовательское соглашение
          </a>
        </UBlock>
        <Button
          onClick={props.onClickClose}
          icon={<UIcon svg={CloseIconComponent} size="small" />}
        />
      </UBlock>
    </Root>
  );
};

export default Presentation;
