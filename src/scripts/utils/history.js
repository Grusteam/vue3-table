const update = (name, value) => {
  const params = value ? setQueryParam(name, value) : deleteQueryParam(name);
  /* const isParams = Array.from(params)?.length; */

  const query = decodeURIComponent(`?${params.toString()}`);

  window.history.pushState({}, '', query);
};

const getQueryParam = (param) => {
  const params = getQueryParams();
  const result = params.get(param);

  /* TODO: if multiple values of same param */
  /* getAll(param) */

  return result;
};

const getAllParams = () => {
  const params = getQueryParams();
  const result = {};

  Array.from(params.entries()).forEach(([key, val]) => {
    result[key] = val;
  });

  return result;
};

const getMultipleParams = (arr) => {
  const params = getQueryParams();

  /* TODO: all */
  /* params.forEach(([val, key])); */

  const result = {};

  arr?.forEach?.((key) => {
    const val = params.get(key);
    result[key] = val;
  });

  return result;
};

const getQueryParams = () => {
  const result = new URLSearchParams(window.location.search);

  return result;
};

const setQueryParam = (name, value) => {
  const params = getQueryParams();

  params.set(name, value);

  return params;
};

const deleteQueryParam = (name) => {
  const params = getQueryParams();

  params.delete(name);

  return params;
};

const getUrlWithUpdatedQueryParam = (name, value) => {
  const newQuery = setQueryParam(name, value);
  const queryString = newQuery.toString();
  const { origin, pathname } = window.location;
  const result = `${origin}${pathname}?${queryString}`;

  return result;
};

const getPath = (params) => {
  const { withLeadingSlash = true } = params || {};
  const { pathname } = window.location || {};
  const pathArray = pathname.split('/');
  const [, firstLevel = ''] = pathArray || [];
  const result = `${withLeadingSlash ? '/' : ''}${firstLevel}`;

  return result;
};

export default {
  update,
  getQueryParam,
  getAllParams,
  getMultipleParams,
  getQueryParams,
  setQueryParam,
  deleteQueryParam,
  getUrlWithUpdatedQueryParam,
  getPath,
};
