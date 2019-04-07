import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { withTests } from '@storybook/addon-jest';
import results from '../jest-test-results.json';
import '../src/globalImports';
addDecorator(withA11y);
addDecorator(
  withInfo({
    inline: true,
  })
);
addDecorator(
  withTests({
    results,
  })
);
// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
