import * as React from 'react';

interface IConstructorParamsProps {}

const ConstructorParams: React.FunctionComponent<IConstructorParamsProps> = props => {
  return (
    <div>
      <strong>параметры запомнить в сессию</strong>
      использовать синонимы, синонимы на языках
    </div>
  );
};

export default ConstructorParams;

export interface $ConstructorParams {
  constructorParams: typeof ConstructorParams;
}
