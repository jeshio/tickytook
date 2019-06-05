/* tslint:disable no-var-requires */
require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['babel-plugin-styled-components'],
});

const moduleAlias = require('module-alias');

moduleAlias.addAlias('src', __dirname + '/../src');
moduleAlias.addAlias('src/images', __dirname + '/../../../src/images');

// require.extensions['.svg'] = (module, filename) =>
//   filename.includes('react-icons')
//     ? (module.exports = () => (React.createElement('div', null), filename))
//     : {};

// ['.css', '.less', '.scss', '.ttf', '.woff', '.woff2', '.png', '.jpg'].forEach(ext => {
//   require.extensions[ext] = () => {};
// });

require('./server');
