import { filterProperties, tableFields } from '../constants/business/table';
import history from './history';

const sortByName = (a, b, reverse) => {
  const result = a?.fullName > b?.fullName ? 1 : -1;
  if (reverse) return -result;

  return result;
};
const sortByDate = (a, b, reverse) => {
  const aDate = new Date(a?.birthDate);
  const bDate = new Date(b?.birthDate);
  const aTimestamp = aDate.getTime();
  const bTimestamp = bDate.getTime();
  const result = aTimestamp > bTimestamp ? 1 : -1;

  if (reverse) return -result;

  return result;
};

const sortByField = (a, b, id, reverse) => {
  const translator = {
    fullName: sortByName,
    birthDate: sortByDate,
  };

  return translator[id]?.(a, b, reverse);
};

const countPaginationParams = (target, size, total) => {
  /* pge < 0 */
  if (!(target > 0)) return { start: 0, end: size };
  /* pge > max */
  if (total && target * size > total) {
    return { start: total - size, end: total };
  }

  const start = target === 1 ? 0 : target * size - size;
  const end = target === 1 ? size : target * size;

  return { start, end };
};

const setLeadingNumbers = (num = 0, length = 2) => {
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += 0;
  }

  result += `${num}`;
  result = result.slice(-length);

  return result;
};

const humanizeDate = (str) => {
  const date = new Date(str);
  const mm = setLeadingNumbers(date.getMonth() + 1);
  const dd = setLeadingNumbers(date.getDate());
  const yyyy = date.getFullYear();
  const result = `${yyyy} ${mm} ${dd}`;

  return result;
};

const decodeCombinedQueryParameterString = (str) => {
  const { keyValSeparator } = filterProperties;
  const reg = new RegExp(
    `(?<key>[A-Za-z]*)${keyValSeparator}(?<val>[A-Za-z0-9,-]*)`,
    'igs'
  );
  const result = {};

  let parse;
  while ((parse = reg.exec(str)) !== null) {
    const { groups } = parse || {};
    const { key, val } = groups || {};

    result[key] = val;
  }

  return result;
};

const encodeCombinedQueryParameterString = (params) => {
  const { keyValSeparator, pairsSeparator } = filterProperties;
  let result = '';
  const arr = Object.entries(params);

  arr.forEach(([key, val], i) => {
    const last = i + 1 === arr?.length;
    result += `${key}${keyValSeparator}${val}${last ? '' : pairsSeparator}`;
  });

  return result;
};

const removeFromArray = (arr = [], element = {}) => {
  /* creates a new array */
  const filtered = arr.filter((el) => el !== element);

  return filtered;
};

const toggleInArray = (arr, element = {}) => {
  if (!arr) return arr;

  const inArray = arr.some((el) => el === element);

  if (inArray) return removeFromArray(arr, element);

  return [...arr, element];
};

const userDataFilter = (user, key, val) => {
  if (!user[key] || !val) return true;

  const area = user[key].toLowerCase?.();
  const target = val.toLowerCase?.();

  return area?.includes(target);
};

const getQueryParams = () => {
  /* real query params */
  const queryParams = history.getAllParams();
  const { tableParams, filter } = queryParams;

  /* certain params from combined string */
  const filterSetup = decodeCombinedQueryParameterString(filter);
  const tableSetup = decodeCombinedQueryParameterString(tableParams);
  const { page: queryPage, sort, perPage, selection } = tableSetup || {};

  /* data interpretation */
  const page = +queryPage > 0 ? +queryPage : 1;
  const pageSize = +perPage > 0 ? +perPage : 10;

  /*  */
  const minusReg = /[-]/;
  const sortingReversed = minusReg.test(sort);
  const sortPure = sort?.replace(minusReg, '');
  const sortingField =
    tableFields.find(({ id }) => id === sortPure)?.id || null;

  const selected = selection?.split(',');
  const selectedItems = (selected || []).map((str) => str.substring(2));

  /* output */
  const result = {
    page,
    perPage: pageSize,
    sortingField,
    sortingReversed,
    filter: filterSetup,
    selectedItems,
  };

  return result;
};

export {
  sortByName,
  sortByDate,
  sortByField,
  countPaginationParams,
  setLeadingNumbers,
  humanizeDate,
  decodeCombinedQueryParameterString,
  encodeCombinedQueryParameterString,
  toggleInArray,
  userDataFilter,
  getQueryParams,
};
