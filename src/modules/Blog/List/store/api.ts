import get from 'lodash/get';
import { IArticle } from 'modules/Blog/List';
import { ARTICLES_LIST } from 'src/config/api';
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
      hidden: boolean;
    };
    sys: {
      id: string;
      createdAt: string;
      updatedAt: string;
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
        hidden: item.fields.hidden,
        logo: {
          title: get(logoAsset, 'fields.title', ''),
          url: get(logoAsset, 'fields.file.url', ''),
        },
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
      };
    }
  );
};

Api.addEndPoint('articles', {
  failureResponse: response => ({ error: 'test' }),
  method: 'get',
  successResponse: response =>
    formatResponse(response as ListResponse).filter(item => !item.hidden),
  url: ARTICLES_LIST,
});

Api.addEndPoint('articleBySlug', {
  failureResponse: response => ({ error: 'test' }),
  method: 'get',
  successResponse: response => formatResponse(response as ListResponse)[0],
  url: ARTICLES_LIST,
});

export default Api;
