<template>
  <div class="">
    <div class="" v-for="{ id, name } in searchFields" :key="id">
      <div class="title">
        {{ name }}
      </div>
      <input class="input" type="text" />
    </div>
  </div>
</template>

<script>
import { searchFields } from '../scripts/constants/business/table';

export default {
  name: 'SearchBar',
  props: {
    x: {
      type: Number,
      default: 1,
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
  methods: {},
};
</script>

<style scoped lang="scss"></style>
