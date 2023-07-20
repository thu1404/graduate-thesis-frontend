<template>
  <div>
    <div class="column" data-column="1">
      <h3>Column 1</h3>
      <draggable
        v-model="column1Items"
        :options="columnOptions"
        :change="cloneAction"
        :move="moveAction"
        data-column="1"
      >
        <div v-for="(item, index) in column1Items" :key="index">{{ item }}</div>
      </draggable>
    </div>
    <div class="column" data-column="2">
      <h3>Column 2</h3>
      <draggable
        v-model="column2Items"
        :options="columnOptions"
        :change="cloneAction"
        :move="moveAction"
        data-column="2"
      >
        <div v-for="(item, index) in column2Items" :key="index">{{ item }}</div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      column1Items: ["Item 1", "Item 2", "Item 3"],
      column2Items: ["Item 4", "Item 5", "Item 6"],
      sourceColumn: null,
      destinationColumn: null,
    };
  },
  computed: {
    columnOptions() {
      return { group: "columns", pull: true };
    },
  },
  methods: {
    cloneAction(event) {
      console.log(event);
    },
    moveAction(event) {
      let fromColum, toColumn;
      if (event.from) {
        fromColum = event.from.getAttribute("data-column");
        toColumn = event.to.getAttribute("data-column");
      }
      console.log("Han", event);
      if (fromColum !== toColumn) {
        console.log(` moved from Column ${fromColum} to Column ${toColumn}`);
      }
    },
  },
};
</script>

<style>
.column {
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
