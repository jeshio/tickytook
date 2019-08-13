import * as React from 'react';
import { Link } from 'react-router-dom';
import UBlock from 'src/ui-components/UBlock';
import UHelmet from 'src/ui-components/UHelmet';
import UTitle from 'src/ui-components/UTitle';
import styled from 'styled-components';

interface IContactsProps {}

const Contacts: React.FunctionComponent<IContactsProps> = props => {
  return (
    <UBlock>
      <UHelmet title="Контактная информация" />

      <UTitle>Контакты</UTitle>

      <UBlock p={[3, 5, 8]} backgroundColor="#fff" borderRadius={[0, '5px']}>
        <UBlock marginBottom={4} mx="auto">
          Мой псевдоним jeshio. Если у вас есть идея или предложение, либо информация об ошибке,
          буду рад ответить на ваши сообщения о них.
          <br />
          <br />
          Вы можете связаться со мной одним из следующих способов:
        </UBlock>
        <UBlock display="flex" justifyContent="space-around" py={4}>
          <UBlock>
            <a href="mailto:jeshio@yandex.ru">E-mail</a>
          </UBlock>
          <UBlock>
            <a href="https://www.instagram.com/ga_ivanov/" target="_blank">
              Instagram Direct
            </a>
          </UBlock>
          <UBlock>
            <a href="https://vk.com/jeshio" target="_blank">
              Вконтакте
            </a>
          </UBlock>
        </UBlock>
      </UBlock>
    </UBlock>
  );
};

export default Contacts;
