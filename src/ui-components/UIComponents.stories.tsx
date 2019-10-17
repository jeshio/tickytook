import { storiesOf } from '@storybook/react';
import * as React from 'react';
import UInput from './UInput';
import UTextarea from './UTextarea';

function storiesOfComponent(Component: (...args: any[]) => any, addRsuiteStories = false) {
  const storyName = `UIComponents/${Component.name}`;
  const story = storiesOf(storyName, module);

  if (addRsuiteStories) {
    storiesOf(`${storyName}/Разные размеры`, module)
      .add('большой', () => <Component size="lg" placeholder="Large" />)
      .add('средний', () => <Component size="md" placeholder="Medium" />)
      .add('маленький', () => <Component size="sm" placeholder="Small" />)
      .add('очень маленький', () => <Component size="xs" placeholder="XSmall" />);
  }

  return story;
}

storiesOfComponent(UTextarea, true)
  .add('без параметров', () => <UTextarea />)
  .add('количество строк', () => <UTextarea rows={7} />);
