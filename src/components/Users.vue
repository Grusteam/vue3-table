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

    <!-- search panel with text inputs -->
    <SearchBar v-model="filter" />

    <!-- page selector -->
    <Pagination
      v-model="page"
      :items="sortedUsers?.length"
      :page-size="perPage"
    />

    <footer>No doubt</footer>

    <!-- optional -->
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
  decodeCombinedQueryParameterString,
  encodeCombinedQueryParameterString,
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
    const { page, perPage, sortingField, filter, selectedItems } =
      this.getQueryParams();
    const users = this.getUsers();

    const result = {
      users,
      /* tableParams */
      page,
      perPage,
      selectedItems,
      /* sort */
      sortingField,
      sortingDirection: false,
      /* filter */
      filter,
    };

    return result;
  },
  watch: {
    tableParams(params) {
      this.setcombinedQueryParam(params);
    },
    filter(filter) {
      this.setcombinedQueryParam(filter);
    },
  },
  computed: {
    sortingParams() {
      const { sortingField, sortingDirection } = this;
      const result = { field: sortingField, direction: sortingDirection };

      return result;
    },
    totalPages() {
      const { sortedUsers, perPage } = this;
      const result = Math.ceil(sortedUsers?.length / perPage);

      return result;
    },
    /* 1 filtering */
    filteredUsers() {
      const { users, filter } = this;
      let result = [...users];

      Object.entries(filter).forEach(([key, val]) => {
        const filter = (user) => {
          if (!user[key] || !val) return true;

          const area = user[key].toLowerCase?.();
          const target = val.toLowerCase?.();

          return area?.includes(target);
        };

        result = result.filter(filter);
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
  },
  beforeCreate() {
    /* please pre-set users number */
    this.usersCount = 1000;
  },
  created() {
    const queryParams = history.getAllParams();

    this.queryParams = queryParams;
  },
  mounted() {
    window.onpopstate = this.watchHistoryState;
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
      /* real query params */
      const queryParams = history.getAllParams();
      const { tableParams, filter } = queryParams;

      /* certain params from combined string */
      const filterSetup = decodeCombinedQueryParameterString(filter);
      const tableSetup = decodeCombinedQueryParameterString(tableParams);
      const { page: queryPage, sort, perPage, selection } = tableSetup || {};

      /* data interpretation */
      const page = +queryPage > 0 ? +queryPage : 1;
      const pageSize = +perPage > 0 ? +perPage : 10;
      const sortingField =
        tableFields.find(({ id }) => id === sort)?.id || null;

      const selected = selection?.split(',');
      const selectedItems = (selected || []).map((str) => str.substring(2));

      /* output */
      const result = {
        page,
        perPage: pageSize,
        sortingField,
        filter: filterSetup,
        selectedItems,
      };

      return result;
    },
    applyQueryParams() {
      const setup = this.getQueryParams();

      Object.entries(setup).forEach(([key, val]) => {
        this[key] = val;
      });
    },
    watchHistoryState(e) {
      console.log('e', e);
      this.applyQueryParams();
    },
    setcombinedQueryParam(params) {
      const newQueryParam = encodeCombinedQueryParameterString(params);

      history.update('tableParams', newQueryParam);
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
</style>
