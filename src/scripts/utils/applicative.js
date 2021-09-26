import { filterProperties } from '../constants/business/table';

const sortByName = (a, b) => {
  const result = a?.fullName > b?.fullName ? 1 : -1;

  return result;
};
const sortByDate = (a, b) => {
  const result = a?.birthDate > b?.birthDate ? 1 : -1;

  return result;
};

const sortByField = (a, b, id) => {
  const translator = {
    fullName: sortByName,
    birthDate: sortByDate,
  };

  return translator[id]?.(a, b);
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
    `(?<key>[A-Za-z0-9]*)${keyValSeparator}(?<val>[A-Za-z0-9]*)`,
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

const encodeCombinedQueryParameterString = (filter) => {
  const { keyValSeparator } = filterProperties;
  let result = '';
  const arr = Object.entries(filter);

  arr.forEach(([key, val], i) => {
    const last = i + 1 === arr?.length;
    result += `${key}${keyValSeparator}${val}${last ? '' : '|'}`;
  });

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
};
