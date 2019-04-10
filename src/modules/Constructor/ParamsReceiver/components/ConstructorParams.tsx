import * as React from 'react';

interface IConstructorParamsProps {}

const ConstructorParams: React.FunctionComponent<IConstructorParamsProps> = props => {
  return (
    <div>
      <strong>параметры запомнить в сессию</strong>
      удалять дубликаты, использовать синонимы, синонимы на языках, убрать хэштеги целиком из цифр,
      убрать хэштеги длиной менее, перевести в нижний регистр
    </div>
  );
};

export default ConstructorParams;

export interface $ConstructorParams {
  constructorParams: typeof ConstructorParams;
}
