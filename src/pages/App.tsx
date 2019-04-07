import React from 'react';
import ParamsReceiver from 'src/modules/Constructor/ParamsReceiver';
import UGrid from 'src/ui-components/UGrid';
import UTitle from 'src/ui-components/UTitle';

export default () => (
  <UGrid>
    <UTitle>Tickytook - оптимизатор хэштегов</UTitle>
    <ParamsReceiver />
  </UGrid>
);
