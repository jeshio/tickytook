import get from 'lodash/get';
import { IArticle } from 'modules/Blog/List';
import ApiService from 'src/core/services/ApiService';
import { IEndPoints } from './interfaces';

const Api = new ApiService<IEndPoints>();

interface ListResponse {
  items: Array<{
    fields: {
      logoUrl: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };
      title: string;
      text: string;
      shortDescription?: string;
      slug: string;
    };
    sys: {
      id: string;
    };
  }>;
  includes: {
    Asset?: Array<{
      sys: {
        id: string;
      };
      fields: {
        title: string;
        file: {
          url: string;
          contentType: string;
        };
      };
    }>;
  };
}

const formatResponse = (resultData: ListResponse): IArticle[] => {
  if (!resultData) {
    return [];
  }

  return resultData.items.map(
    (item): IArticle => {
      const logoAsset = resultData.includes.Asset
        ? resultData.includes.Asset.find(asset => asset.sys.id === item.fields.logoUrl.sys.id)
        : {};

      return {
        id: item.sys.id,
        title: item.fields.title,
        text: item.fields.text,
        shortDescription: item.fields.shortDescription,
        slug: item.fields.slug,
        logo: {
          title: get(logoAsset, 'fields.title', ''),
          url: get(logoAsset, 'fields.file.url', ''),
        },
      };
    }
  );
};

Api.addEndPoint('articles', {
  failureResponse: response => ({ error: 'test' }),
  method: 'get',
  successResponse: response => formatResponse(response as ListResponse),
  url: `https://cdn.contentful.com/spaces/60wx9rdh5fwz/entries?access_token=twKpbbcLNEa8v29ppOgCLS1IEsClvVdfG91ab752Axc&content_type=article`,
});

Api.addEndPoint('articleBySlug', {
  failureResponse: response => ({ error: 'test' }),
  method: 'get',
  successResponse: response => formatResponse(response as ListResponse)[0],
  url: `https://cdn.contentful.com/spaces/60wx9rdh5fwz/entries?access_token=twKpbbcLNEa8v29ppOgCLS1IEsClvVdfG91ab752Axc&content_type=article`,
});

export default Api;
