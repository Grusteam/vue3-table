<template>
  <div class="pagination">
    <div
      :class="{ pagination__item: true, active: modelValue === id }"
      v-for="{ id } in pages"
      :key="id"
      @click="$emit('update:modelValue', id)"
    >
      {{ id }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    items: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalPages() {
      const { items, pageSize } = this;
      const result = Math.ceil(items / (pageSize || 1) || 1);

      return result;
    },
    pages() {
      const { totalPages } = this;
      const result = Array(totalPages)
        .fill()
        .map((val, index) => ({ id: index + 1, index }));

      return result;
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  &__item {
    display: inline-block;
    cursor: pointer;
    margin: 0 4px;

    &.active {
      background-color: #ff0;
    }
  }
}
</style>
