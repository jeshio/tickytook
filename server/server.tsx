/* tslint:disable no-console */
import 'babel-polyfill';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { frontloadServerRender } from 'react-frontload';

import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import ReactRouter, { StaticContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';
import getStore from '../src/store';

const IS_PROD = process.env.NODE_ENV === 'production';

const PORT = IS_PROD ? 80 : 9000;
const app = express();

const BUILD_DIR = path.resolve('./build');

const router = express.Router();

(global as any).window = {
  location: {
    href: '',
  },
  localStorage: {
    getItem: () => {},
    setItem: () => {},
    removeItem: () => {},
  },
};

const serverRenderer = async (req, res, next) => {
  await fs.readFile(path.resolve('./build/index.html'), 'utf8', async (err, data) => {
    const sheet = new ServerStyleSheet();
    let html;
    let styleTags;
    let helmetContent;
    let preloadedState;

    if (err) {
      console.error(err);
      return res.status(500).send('Файл index.html предположительно не найден');
    }

    try {
      const context = {} as StaticContext;
      const store = getStore();
      html = await frontloadServerRender(
        () =>
          ReactDOMServer.renderToString(
            sheet.collectStyles(
              React.createElement(
                StaticRouter,
                {
                  location: req.originalUrl,
                  context,
                },
                React.createElement(App, { store })
              )
            )
          ) || ''
      );

      if (context.statusCode) {
        res.status(context.statusCode);
      }

      styleTags = sheet.getStyleTags() || '';

      const helmet = Helmet.renderStatic();
      helmetContent = `${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}`;
      preloadedState = store.getState();
    } catch (error) {
      // handle error
      console.error(error);
    } finally {
      sheet.seal();
    }

    return res.send(
      data.replace('<react-helmet-replacer></react-helmet-replacer>', helmetContent).replace(
        '<div id="root"></div>',
        `${styleTags}<div id="root">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}</script>`
      )
    );
  });
};
router.use(/^([^\.])*$/, serverRenderer);

router.use(express.static(BUILD_DIR, { maxAge: '7d' }));

// tell the app to use the above rules
app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
