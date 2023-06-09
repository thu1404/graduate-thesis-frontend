<template>
  <el-dialog
    title="Add new profile"
    :visible.sync="isOpen"
    width="50%"
  >
    <pre>
      {{ cv }}
    </pre>
  </el-dialog>
</template>
<script>
export default {
  name: 'DetailCv',

  props: {
    cv: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    open() {
      this.isOpen = true;
    }
  }
};
</script>
<style lang="scss">
  
</style>
