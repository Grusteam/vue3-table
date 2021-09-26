<template>
  <div class="root">
    <div class="table">
      <table>
        <thead>
          <tr>
            <!-- map titles -->
            <th v-for="{ id, name } in searchFields" :key="id">
              {{ name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- map inputs -->
            <td v-for="{ id } in searchFields" :key="id">
              <input
                class="input"
                type="text"
                :value="modelValue[id]"
                @input="atInput(id, $event.target.value)"
                @keydown.enter.exact="search"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--  -->
    <div class="actions">
      <button
        v-for="{ id, action, name } in searchActions"
        :key="id"
        @click="run(action, id)"
      >
        {{ name }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  searchFields,
  searchActions,
} from '../scripts/constants/business/table';

export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const { modelValue } = this;

    console.log('modelValue', modelValue);

    const result = {
      localValue: modelValue,
    };

    return result;
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.searchFields = searchFields;
    this.searchActions = searchActions;
  },
  methods: {
    atInput(key, value) {
      const { modelValue } = this;
      const result = {
        ...modelValue,
        [key]: value,
      };

      this.localValue = result;

      return result;
    },
    search() {
      const { localValue } = this;

      this.$emit('update:modelValue', localValue);
    },
    reset() {
      this.localValue = {};
      this.$emit('update:modelValue', this.localValue);
    },
    run(method, params) {
      this[method]?.(params);
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  width: 500px;

  th,
  tr {
    min-width: 200px;
  }
}

.actions {
  display: flex;
  margin-left: 150px;
}
</style>
