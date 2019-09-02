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
      <UHelmet
        title="Контактная информация"
        description="Контактная информация для связи с создателем проекта."
      />

      <UTitle>Контакты</UTitle>

      <UBlock p={[3, 6, 8]} backgroundColor="#fff" borderRadius={[0, '5px']}>
        <UBlock px={[4, 7, '3rem']} marginBottom={[2, 4]} mx="auto">
          Если у вас есть идея или предложение, либо информация об ошибке, пожалуйста,
          воспользуйтесь одним из следующих способов для связи:
          <br />
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
