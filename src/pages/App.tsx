import React from 'react';
import Conclusion from 'src/modules/Constructor/Conclusion';
import ParamsReceiver from 'src/modules/Constructor/ParamsReceiver';
import UGrid from 'src/ui-components/UGrid';
import UTitle from 'src/ui-components/UTitle';

export default () => (
  <UGrid>
    <UTitle>Tickytook - оптимизатор хэштегов</UTitle>
    <ParamsReceiver />
    <Conclusion />
  </UGrid>
);
