import { datatype, name, date } from 'faker';
import { humanizeDate } from './time';

const getUser = () => {
  const id = datatype.uuid();
  const firstName = name.firstName();
  const lastName = name.lastName();
  const birthDate = date.past();
  const birthDateHumanized = humanizeDate(birthDate);
  const fullName = `${firstName} ${lastName}`;
  const result = {
    id,
    firstName,
    lastName,
    fullName,
    birthDate,
    birthDateHumanized,
  };

  return result;
};

const getUsers = (count = 1) => {
  const result = Array(count).fill().map(getUser);

  return result;
};

export { getUsers };
