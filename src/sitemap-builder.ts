import Sitemap from 'react-router-sitemap';

import Api from './modules/Blog/List/store/api';
import router from './pages/router';

/**
 * В этом файле необходимо добавлять подгружаемые данные,
 * если необходимо присутствие их url в sitemap
 */

Api.endPoints.articles({}).then(articles => {
  const paramsConfig = {
    '/articles/:slug': [{ slug: articles.map(a => a.slug) }],
  };

  new Sitemap(router)
    .applyParams(paramsConfig)
    .build('https://tickytook.ru', { limitCountPaths: 5000 })
    .save('./public/sitemap.xml');
});
