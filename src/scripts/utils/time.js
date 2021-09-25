const humanizeDate = (o = new Date()) => {
  const setup = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const result = o.toLocaleDateString('en-GB', setup);

  return result;
};

export { humanizeDate };
