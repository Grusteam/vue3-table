<template>
  <div class="">
    <div class="" v-for="{ id, name } in searchFields" :key="id">
      <div class="title">
        {{ name }}
      </div>
      <input
        class="input"
        type="text"
        :value="modelValue[id]"
        @input="atInput(id, $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import { searchFields } from '../scripts/constants/business/table';

export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const result = {};

    return result;
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.searchFields = searchFields;
  },
  methods: {
    atInput(key, value) {
      const { modelValue } = this;
      const result = {
        ...modelValue,
        [key]: value,
      };

      this.$emit('update:modelValue', result);

      return result;
    },
  },
};
</script>

<style scoped lang="scss"></style>
