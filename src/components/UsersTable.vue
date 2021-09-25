<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <!-- column name -->
          <th
            v-for="{ id, name } in tableFields"
            :key="id"
            :class="{
              'is-active': sorting?.field === id,
              asc: sorting?.direction,
            }"
            @click="$emit('sort', id)"
          >
            {{ name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- row (user) -->
        <tr v-for="user in items" :key="user.id">
          <!-- value -->
          <td v-for="{ id } in tableFields" :key="id">
            {{ user[id] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { tableFields } from '../scripts/constants/business/table';

export default {
  name: 'UsersTable',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    sorting: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const result = {};

    return result;
  },
  computed: {},
  created() {
    this.tableFields = tableFields;

    console.log('this.items', this.items);
  },
  methods: {},
};
</script>

<style scoped></style>
