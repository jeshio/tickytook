/* tslint:disable no-console */
import 'babel-polyfill';
import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';

const PORT = 80;
const app = express();

const BUILD_DIR = path.resolve('./build');

const router = express.Router();

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    const sheet = new ServerStyleSheet();
    let html;
    let styleTags;

    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    try {
      html = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
      styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    } catch (error) {
      // handle error
      console.error(error);
    } finally {
      sheet.seal();
    }

    return res.send(
      data.replace('<div id="root"></div>', `${styleTags}<div id="root">${html}</div>`)
    );
  });
};
router.use('^/$', serverRenderer);

router.use(express.static(BUILD_DIR, { maxAge: '7d' }));

// tell the app to use the above rules
app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
