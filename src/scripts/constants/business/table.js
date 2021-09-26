const userModelFields = [{ id: 'id' }, { id: 'fullName' }, { id: 'birthDate' }];

const tableFields = [
  { id: 'fullName', name: 'Full Name' },
  { id: 'birthDate', name: 'Birth Date' },
];

const searchFields = [
  { id: 'fullName', name: 'Full Name' },
  { id: 'birthDate', name: 'Birth Date' },
];

const queryParams = [
  { id: 'fullName', name: 'Full Name' },
  { id: 'birthDate', name: 'Birth Date' },
  { id: 'perPage', name: 'Per Page' },
];

const filterProperties = {
  keyValSeparator: ':',
  pairsSeparator: '|',
};

export { userModelFields, tableFields, searchFields, filterProperties };
