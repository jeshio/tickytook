import * as React from 'react';
import { Link } from 'react-router-dom';
import UBlock from 'src/ui-components/UBlock';
import UHelmet from 'src/ui-components/UHelmet';
import UTitle from 'src/ui-components/UTitle';

interface INotFoundProps {}

const NotFound: React.FunctionComponent<INotFoundProps> = props => {
  return (
    <UBlock>
      <UHelmet
        title="404 Страница не найдена"
        description="URL страницы неверен, лучше перейти на главную страницу ощутить невероятное могущество Тикитука!"
      />
      <UTitle>Ошибочка</UTitle>

      <UBlock textAlign="center" py={8}>
        <h2>404. Страница не найдена.</h2>
        <Link to="/">Перейти на главную</Link>
      </UBlock>
    </UBlock>
  );
};

export default NotFound;
