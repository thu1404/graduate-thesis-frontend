<template>
  <div class="column">
    <h3>{{ title }}</h3>
    <draggable v-model="items">
      <div v-for="(item, index) in items" :key="index">{{ item }}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  props: ['title', 'items'],
};
</script>

<style lang="scss" scoped>
.column {
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
