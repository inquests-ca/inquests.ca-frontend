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
  return fetchJson<DataWithCount<Authority[]>>('/authorities', query).then((response) => {
    if (response.error) throw new Error(response.error);
    return response.data!;
  });
};

export type InquestQuery = BaseQuery;
export const fetchInquests = async ({ text, keywords, page }: InquestQuery) => {
  const query = { text, keywords, limit: PAGINATION, offset: (page - 1) * PAGINATION };
  return fetchJson<DataWithCount<Inquest[]>>('/inquests', query).then((response) => {
    if (response.error) throw new Error(response.error);
    return response.data!;
  });
};
