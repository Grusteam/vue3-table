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

const countPaginationParams = (target, size) => {
  const start = target === 1 ? 0 : target * size - size;
  const end = target === 1 ? size : target * size;

  return {
    start,
    end,
  };
};

export { sortByName, sortByDate, sortByField, countPaginationParams };
