<template>
  <div class="users">
    <header>Oboz forever</header>
    <UsersTable
      :items="usersOutput"
      :sorting="sortingParams"
      @sort="(id) => (sortingField = id)"
    />
    <!--  -->
    <SearchBar />
    <!--  -->
    <Pagination
      v-model="page"
      :items="sortedUsers?.length"
      :page-size="pageSize"
    />
    <button @click="users = generateNewUsers()">Generate new users</button>
    <footer>No doubt</footer>
  </div>
</template>

<script>
import UsersTable from './UsersTable';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { getUsers } from '../scripts/utils/faker';
import {
  countPaginationParams,
  sortByField,
} from '../scripts/utils/applicative';
import history from '../scripts/utils/history';
import { tableFields } from '../scripts/constants/business/table';

export default {
  name: 'Users',
  components: {
    UsersTable,
    Pagination,
    SearchBar,
  },
  data() {
    const { page, pageSize, sortingField } = this.getQueryParams();
    const users = this.getUsers();

    this.pageSize = pageSize;

    const result = {
      users,
      /*  */
      page,
      sortingField,
      sortingDirection: false,
    };

    return result;
  },
  watch: {
    page(val) {
      history.update('page', val);
    },
  },
  computed: {
    sortingParams() {
      const { sortingField, sortingDirection } = this;
      const result = { field: sortingField, direction: sortingDirection };

      return result;
    },
    totalPages() {
      const { sortedUsers, pageSize } = this;
      const result = Math.ceil(sortedUsers?.length / pageSize);

      return result;
    },
    /* 1 filtering */
    filteredUsers() {
      const { users } = this;

      const filter = () => true;

      const result = users.filter(filter);

      return result;
    },
    /* 2 sorting */
    sortedUsers() {
      const { users, sortingField } = this;
      const result = [...users];

      const sort = (a, b) => sortByField(a, b, sortingField);

      /* sort */
      if (sortingField) result.sort(sort);

      return result;
    },
    /* 3 pagination */
    usersOutput() {
      const { sortedUsers, page, pageSize } = this;
      const { start, end } = countPaginationParams(
        page,
        pageSize,
        sortedUsers.length
      );
      const result = sortedUsers.slice(start, end);

      return result;
    },
  },
  beforeCreate() {
    /* plwase pre-set users number */
    this.usersCount = 100;
  },
  created() {
    const queryParams = history.getAllParams();

    this.queryParams = queryParams;
  },
  methods: {
    getUsers() {
      const { usersCount } = this;
      const storedUsersString = localStorage.getItem('_oboz-table-users');
      let users = [];

      /*  */
      try {
        const storedUsers = JSON.parse(storedUsersString);

        if (storedUsers?.length === usersCount) users = storedUsers;
      } catch (e) {
        console.error(e);
        localStorage.removeItem('_oboz-table-users');
      }

      /* ER */
      if (users?.length) return users;

      users = this.generateNewUsers();

      return users;
    },
    generateNewUsers() {
      const { usersCount } = this;
      const result = getUsers(usersCount);

      localStorage.setItem('_oboz-table-users', JSON.stringify(result));

      return result;
    },
    getQueryParams() {
      const queryParams = history.getAllParams();
      const {
        page: queryPage,
        sort,
        perPage /* selection, filter */,
      } = queryParams;
      const page = +queryPage > 0 ? +queryPage : 1;
      const pageSize = +perPage > 0 ? +perPage : 10;
      const sortingField =
        tableFields.find(({ id }) => id === sort)?.id || null;

      const result = { page, pageSize, sortingField };

      // console.log('input', queryParams);
      // console.log('output', result);

      return result;
    },
  },
};
</script>

<style scoped lang="scss"></style>

/* tableParams=sort:-fullName page:1 perPage=5 selection=id1,id2
filter=fullName:Vladis birthDate:12.12.2012 */
