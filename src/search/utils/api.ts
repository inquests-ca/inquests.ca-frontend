import { fetchJson } from '../../common/utils/request';
import { PAGINATION } from '../../common/constants';
import { DataWithCount } from '../../common/types';
import { Authority, Inquest } from '../../common/models';

type BaseQuery = {
  text: string;
  keywords: string[];
  page: number;
};

export type AuthorityQuery = BaseQuery;
export const fetchAuthorities = ({ text, keywords, page }: AuthorityQuery) => {
  const query = { text, keywords, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Authority[]>>('/authorities', query);
};
export const defaultAuthorityQuery = (): AuthorityQuery => ({ text: '', keywords: [], page: 1 });

export type InquestQuery = BaseQuery;
export const fetchInquests = ({ text, keywords, page }: InquestQuery) => {
  const query = { text, keywords, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Inquest[]>>('/inquests', query);
};
export const defaultInquestQuery = (): InquestQuery => ({ text: '', keywords: [], page: 1 });
