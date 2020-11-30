import joi from 'joi';
import { useLocation } from 'react-router-dom';

import { parseQuery } from 'common/utils/request';

const useQueryParams = <T>(schema: joi.ObjectSchema<T>) => {
  const query = parseQuery(useLocation().search);
  const validation = schema.validate(query, { stripUnknown: true });
  if (validation.error || !validation.value) return null;
  else return validation.value as T;
};

export default useQueryParams;
