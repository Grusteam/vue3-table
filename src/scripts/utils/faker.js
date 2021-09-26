import { name, date } from 'faker';

const getUser = (_, index) => {
  const id = `${index}`;
  const firstName = name.firstName();
  const lastName = name.lastName();
  const birthDate = date.past().toString();
  const fullName = `${firstName} ${lastName}`;
  const result = {
    id,
    firstName,
    lastName,
    fullName,
    birthDate,
  };

  return result;
};

const getUsers = (count = 1) => {
  const result = Array(count).fill().map(getUser);

  return result;
};

export { getUsers };
