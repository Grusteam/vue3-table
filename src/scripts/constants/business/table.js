/* query string requirements example */
/*
tableParams=
  sort:-fullName
  page:1
  perPage=5
  selection=id1,id2

filter=
  fullName:Vladis
  birthDate:12.12.2012
*/

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

export {
  userModelFields,
  tableFields,
  searchFields,
  filterProperties,
  queryParams,
};
