import React from 'react';
import Conclusion from 'src/modules/Constructor/Conclusion';
import ParamsReceiver from 'src/modules/Constructor/ParamsReceiver';
import UGrid from 'src/ui-components/UGrid';
export default () => (
  <UGrid>
    <ParamsReceiver />
    <Conclusion />
  </UGrid>
);
