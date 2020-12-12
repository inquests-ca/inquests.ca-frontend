import joi from 'joi';

import { fetchJson } from 'common/utils/request';
import { PAGINATION } from 'common/constants';
import { DataWithCount } from 'common/types';
import { Authority, Inquest } from 'common/models';

export enum Sort {
  Relevant = 'relevant',
  New = 'new',
  Alphabetical = 'a-z',
}

interface BaseQuery {
  text: string;
  keywords: string[];
  jurisdiction: string;
  page: number;
  sort: Sort;
}

const baseQuerySchema = joi.object({
  text: joi.string(),
  keywords: joi.array(),
  jurisdiction: joi.string(),
  page: joi.number().integer().positive().default(1),
  sort: joi.string().valid(...Object.values(Sort)),
});

const defaultBaseQuery = (): BaseQuery => ({
  text: '',
  keywords: [],
  jurisdiction: '',
  page: 1,
  sort: Sort.Relevant,
});

export type AuthorityQuery = BaseQuery;
export const fetchAuthorities = (query: AuthorityQuery) => {
  const apiQuery = {
    ...query,
    page: undefined, // Remove page query parameter (effectively replaced by offset).
    limit: PAGINATION,
    offset: (query.page - 1) * PAGINATION,
  };
  return fetchJson<DataWithCount<Authority[]>>('/authorities', apiQuery);
};
export const defaultAuthorityQuery = (): AuthorityQuery => defaultBaseQuery();
export const authorityQuerySchema = baseQuerySchema;

export type InquestQuery = BaseQuery;
export const fetchInquests = (query: InquestQuery) => {
  const apiQuery = {
    ...query,
    page: undefined, // Remove page query parameter (effectively replaced by offset).
    limit: PAGINATION,
    offset: (query.page - 1) * PAGINATION,
  };
  return fetchJson<DataWithCount<Inquest[]>>('/inquests', apiQuery);
};
export const defaultInquestQuery = (): InquestQuery => defaultBaseQuery();
export const inquestQuerySchema = baseQuerySchema;
