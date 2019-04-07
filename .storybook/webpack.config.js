const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin'); // Optional
module.exports = ({ config }, env) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader'),
    options: { configFile: path.resolve(__dirname, './tsconfig.json') },
  });
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });
  config.plugins.push(new TSDocgenPlugin()); // optional
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
