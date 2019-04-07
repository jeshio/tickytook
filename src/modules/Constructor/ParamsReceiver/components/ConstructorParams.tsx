import * as React from 'react';

interface IConstructorParamsProps {}

const ConstructorParams: React.FunctionComponent<IConstructorParamsProps> = props => {
  return <div>constructor params</div>;
};

export default ConstructorParams;

export interface $ConstructorParams {
  constructorParams: typeof ConstructorParams;
}
