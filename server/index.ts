/* tslint:disable no-var-requires */
require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'transform-assets',
      {
        extensions: ['svg'],
        name: 'static/media/[name].[hash:8].[ext]',
      },
    ],
    [
      'inline-react-svg',
      {
        ignorePattern: /^(?!.*(images\/components))/gm,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          'src/images': __dirname + '/../../../src/images',
          src: __dirname + '/../src',
        },
      },
    ],
    'babel-plugin-styled-components',
  ],
});

require('./server');
