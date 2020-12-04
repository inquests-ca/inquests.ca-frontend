import joi from 'joi';

import { fetchJson } from 'common/utils/request';
import { PAGINATION } from 'common/constants';
import { DataWithCount } from 'common/types';
import { Authority, Inquest } from 'common/models';

interface BaseQuery {
  text: string;
  keywords: string[];
  page: number;
}

const baseQuerySchema = joi.object({
  text: joi.string(),
  keywords: joi.array(),
  page: joi.number().integer().positive().default(1),
});

// TODO: Do not show page query param in client when page=1.
export type AuthorityQuery = BaseQuery;
export const fetchAuthorities = ({ text, keywords, page }: AuthorityQuery) => {
  const query = { text, keywords, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Authority[]>>('/authorities', query);
};
export const defaultAuthorityQuery = (): AuthorityQuery => ({ text: '', keywords: [], page: 1 });
export const authorityQuerySchema = baseQuerySchema;

export type InquestQuery = BaseQuery;
export const fetchInquests = ({ text, keywords, page }: InquestQuery) => {
  const query = { text, keywords, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Inquest[]>>('/inquests', query);
};
export const defaultInquestQuery = (): InquestQuery => ({ text: '', keywords: [], page: 1 });
export const inquestQuerySchema = baseQuerySchema;
