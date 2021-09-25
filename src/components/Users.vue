<template>
  <div class="hello">
    <header>Oboz forever</header>
    <UsersTable
      :items="usersOutput"
      :sorting="sortingParams"
      @sort="(id) => (sortingField = id)"
    />
    <div class="pagination">
      <span
        class="pagination__item"
        v-for="(n, i) in totalPages"
        :key="i"
        @click="page = n"
      >
        {{ n }} &nbsp;
      </span>
    </div>
    <footer>No doubt</footer>
  </div>
</template>

<script>
import UsersTable from './UsersTable';
import { getUsers } from '../scripts/utils/faker';
import {
  countPaginationParams,
  sortByField,
} from '../scripts/utils/applicative';
import { pageSize } from '../scripts/constants/business/table';

export default {
  name: 'Users',
  components: {
    UsersTable,
  },
  data() {
    const result = {
      page: 1,
      sortingField: null,
      sortingDirection: false,
    };

    return result;
  },
  computed: {
    sortingParams() {
      const { sortingField, sortingDirection } = this;
      const result = { sortingField, sortingDirection };

      return result;
    },
    totalPages() {
      const { filteredUsers } = this;
      const result = Math.ceil(filteredUsers?.length / pageSize);

      return result;
    },
    /* filtering */
    filteredUsers() {
      const { users, sortingField } = this;
      const result = [...users];

      const sort = (a, b) => sortByField(a, b, sortingField);

      /* sort */
      if (sortingField) result.sort(sort);

      return result;
    },
    /* pagination */
    usersOutput() {
      const { filteredUsers, page } = this;
      const { start, end } = countPaginationParams(page, pageSize);
      const result = filteredUsers.slice(start, end);
      console.log('page, start, end', page, start, end);

      return result;
    },
  },
  beforeCreate() {
    this.usersCount = 300;
  },
  created() {
    const users = getUsers(this.usersCount);

    this.users = users;
  },
  methods: {},
};
</script>

<style scoped></style>

/* tableParams=sort:-fullName page:1 perPage=5 selection=id1,id2
filter=fullName:Vladis birthDate:12.12.2012 */
