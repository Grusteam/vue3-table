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

const update = (name, value) => {
  const params = value ? setQueryParam(name, value) : deleteQueryParam(name);

  const query = decodeURIComponent(`?${params.toString()}`);

  window.history.pushState({}, '', query);
};

const getQueryParams = () => {
  const result = new URLSearchParams(window.location.search);

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

export default {
  update,
  getAllParams,
};
