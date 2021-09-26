<template>
  <div class="users">
    <header>Oboz forever</header>

    <!-- table -->
    <UsersTable
      v-model="selectedItems"
      :items="usersOutput"
      :sorting="sortingParams"
      @sort="(id) => (sortingField = id)"
    />

    <!-- search panel with text inputs and actions -->
    <SearchBar v-model="filter" />

    <!-- page selector -->
    <Pagination
      v-model="page"
      :items="sortedUsers?.length"
      :page-size="perPage"
    />

    <footer>No doubt</footer>

    <!-- optional  FIXME: !DEV MODE ONLY!-->
    <div class="devtools">
      <div class="devtools__title">Dev Tools</div>

      <button @click="users = generateNewUsers()">Generate new users</button>
    </div>
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
  encodeCombinedQueryParameterString,
  userDataFilter,
  getQueryParams,
} from '../scripts/utils/applicative';
import history from '../scripts/utils/history';

export default {
  name: 'Users',
  components: {
    UsersTable,
    Pagination,
    SearchBar,
  },
  data() {
    const { page, perPage, sortingField, filter, selectedItems } =
      getQueryParams();
    const users = this.getUsers();

    console.log('filter', filter);

    const result = {
      users,
      /* tableParams */
      page,
      perPage,
      selectedItems,
      sortingField,
      /* filter */
      filter,
    };

    return result;
  },
  watch: {
    tableParams(value) {
      this.setcombinedQueryParam('tableParams', value);
    },
    filter(value) {
      this.setcombinedQueryParam('filter', value);
    },
  },
  computed: {
    /* 1 filtering */
    filteredUsers() {
      const { users, filter } = this;
      let result = [...users];

      Object.entries(filter).forEach(([key, val]) => {
        result = result.filter((user) => userDataFilter(user, key, val));
      });

      return result;
    },
    /* 2 sorting */
    sortedUsers() {
      const { filteredUsers, sortingField } = this;
      const result = [...filteredUsers];
      const sort = (a, b) => sortByField(a, b, sortingField);

      /* sort */
      if (sortingField) result.sort(sort);

      return result;
    },
    /* 3 pagination */
    usersOutput() {
      const { sortedUsers, page, perPage } = this;
      const { start, end } = countPaginationParams(
        page,
        perPage,
        sortedUsers.length
      );
      const result = sortedUsers.slice(start, end);

      return result;
    },
    /* query */
    tableParams() {
      const { page, perPage, sortingField, selectedItems } = this;
      const selection = selectedItems.map((id) => `id${id}`);
      const result = {
        page,
        perPage,
        sort: sortingField,
        selection,
      };

      return result;
    },
    /*  */
    sortingParams() {
      const { sortingField } = this;
      const result = { field: sortingField };

      return result;
    },
  },
  beforeCreate() {
    /* TODO: please pre-set users number */
    this.usersCount = 200;
  },
  created() {
    const queryParams = history.getAllParams();

    this.queryParams = queryParams;

    /* wath history */
    window.onpopstate = this.watchHistoryState;
  },
  mounted() {},
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
    applyQueryParams() {
      const setup = getQueryParams();

      Object.entries(setup).forEach(([key, val]) => {
        this[key] = val;
      });
    },
    watchHistoryState() {
      this.applyQueryParams();
    },
    setcombinedQueryParam(name, params) {
      const newQueryParam = encodeCombinedQueryParameterString(params);

      history.update(name, newQueryParam);
    },
  },
};
</script>

<style scoped lang="scss">
.users {
  display: grid;
}

.devtools {
  opacity: 0.3;
  position: fixed;
  bottom: 0;
}

footer {
  margin-top: 100px;
}
</style>
