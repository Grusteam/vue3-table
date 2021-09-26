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

export {
  sortByName,
  sortByDate,
  sortByField,
  countPaginationParams,
  setLeadingNumbers,
  humanizeDate,
};
