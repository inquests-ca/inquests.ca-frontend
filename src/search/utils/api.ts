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
  page: number;
  sort: Sort;
}

const baseQuerySchema = joi.object({
  text: joi.string(),
  keywords: joi.array(),
  page: joi.number().integer().positive().default(1),
  sort: joi.string().valid(...Object.values(Sort)),
});

const defaultBaseQuery = (): BaseQuery => ({
  text: '',
  keywords: [],
  page: 1,
  sort: Sort.Relevant,
});

// TODO: Do not show page query param in client when page=1.
export type AuthorityQuery = BaseQuery;
export const fetchAuthorities = ({ text, keywords, page, sort }: AuthorityQuery) => {
  const query = { text, keywords, sort, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Authority[]>>('/authorities', query);
};
export const defaultAuthorityQuery = (): AuthorityQuery => defaultBaseQuery();
export const authorityQuerySchema = baseQuerySchema;

export type InquestQuery = BaseQuery;
export const fetchInquests = ({ text, keywords, page, sort }: InquestQuery) => {
  const query = { text, keywords, sort, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Inquest[]>>('/inquests', query);
};
export const defaultInquestQuery = (): InquestQuery => defaultBaseQuery();
export const inquestQuerySchema = baseQuerySchema;
