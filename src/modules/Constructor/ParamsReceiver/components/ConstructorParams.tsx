import * as React from 'react';

interface IConstructorParamsProps {}

const ConstructorParams: React.FunctionComponent<IConstructorParamsProps> = props => {
  return <div>удалять дубликаты, использовать синонимы, синонимы на языках</div>;
};

export default ConstructorParams;

export interface $ConstructorParams {
  constructorParams: typeof ConstructorParams;
}
