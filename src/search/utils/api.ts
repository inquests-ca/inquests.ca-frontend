import joi from 'joi';

import { fetchJson } from 'common/utils/request';
import { DataWithCount } from 'common/types';
import { Authority, Inquest } from 'common/models';

export const PAGINATION = 12;

export enum Sort {
  Relevant = 'relevant',
  New = 'new',
  Alphabetical = 'a-z',
}

interface BaseQuery {
  page: number;
  text: string;
  keywords: { [key: string]: string[] }; // Keywords listed by category.
  jurisdiction: string;
  sort: Sort;
}

const baseQuerySchema = joi.object<BaseQuery>({
  page: joi.number().integer().positive(),
  text: joi.string(),
  keywords: joi.object<string, string[]>(),
  jurisdiction: joi.string(),
  sort: joi.string().valid(...Object.values(Sort)),
});

const defaultBaseQuery = (): BaseQuery => ({
  page: 1,
  text: '',
  keywords: {},
  jurisdiction: '',
  sort: Sort.Relevant,
});

export type AuthorityQuery = BaseQuery;
export const fetchAuthorities = (query: AuthorityQuery) => {
  const apiQuery = {
    ...query,
    page: undefined, // Remove page query parameter (effectively replaced by offset).
    keywords: Object.values(query.keywords).flat(), // Flatten keywords object.
    limit: PAGINATION,
    offset: (query.page - 1) * PAGINATION,
  };
  return fetchJson<DataWithCount<Authority[]>>('/authorities', apiQuery);
};
export const defaultAuthorityQuery = (): AuthorityQuery => defaultBaseQuery();
export const authorityQuerySchema = baseQuerySchema;

export interface InquestQuery extends BaseQuery {
  deathCause: string;
}
export const fetchInquests = (query: InquestQuery) => {
  const apiQuery = {
    ...query,
    page: undefined, // Remove page query parameter (effectively replaced by offset).
    keywords: Object.values(query.keywords).flat(), // Flatten keywords object.
    limit: PAGINATION,
    offset: (query.page - 1) * PAGINATION,
  };
  return fetchJson<DataWithCount<Inquest[]>>('/inquests', apiQuery);
};
export const defaultInquestQuery = (): InquestQuery => ({
  ...defaultBaseQuery(),
  deathCause: '',
});
export const inquestQuerySchema = (baseQuerySchema as joi.ObjectSchema<InquestQuery>).keys({
  deathCause: joi.string(),
});
