<template>
  <div class="table">
    <!-- fallback -->
    <div v-if="!items?.length">
      <div>Sorry, no users found</div>
      <div>Pleace try to change you request parameters</div>
    </div>

    <!--  -->
    <table v-else>
      <thead>
        <tr>
          <!-- column name -->
          <th
            v-for="{ id, name } in tableFields"
            :key="id"
            :class="{
              column: true,
              active: sorting?.field === id,
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
        <tr
          v-for="user in items"
          :class="{
            row: true,
            active: modelValue?.includes(user.id),
          }"
          :key="user.id"
          @click="atRowClick(user.id)"
        >
          <!-- value -->
          <td v-for="{ id } in tableFields" :key="id">
            {{ id === 'birthDate' ? humanizeDate(user[id]) : user[id] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { tableFields } from '../scripts/constants/business/table';
import { humanizeDate, toggleInArray } from '../scripts/utils/applicative';

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
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const result = {};

    return result;
  },
  computed: {},
  created() {
    this.tableFields = tableFields;
    this.humanizeDate = humanizeDate;
  },
  methods: {
    atRowClick(id) {
      const { modelValue } = this;
      const result = toggleInArray(modelValue, id);

      this.$emit('update:modelValue', result);
    },
  },
};
</script>

<style scoped lang="scss">
.column {
  &.active {
    background-color: #ff0;
  }
}

.table {
  th,
  tr {
    min-width: 200px;
  }

  .column {
    cursor: pointer;
  }
  .row {
    cursor: pointer;

    &.active {
      background-color: #0f0;
    }
  }
}
</style>
