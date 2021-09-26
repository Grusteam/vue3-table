const sortByName = (a, b) => {
  const result = a?.fullName > b?.fullName ? -1 : 1;

  return result;
};
const sortByDate = (a, b) => {
  const result = a?.birthDateHumanized > b?.birthDateHumanized ? -1 : 1;

  return result;
};

const sortByField = (a, b, id) => {
  const translator = {
    fullName: sortByName,
    birthDateHumanized: sortByDate,
  };

  return translator[id](a, b);
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

export { sortByName, sortByDate, sortByField, countPaginationParams };
