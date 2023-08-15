<template>
  <el-dialog
    title="Detail Job"
    :visible.sync="isOpen"
  >
    job
  </el-dialog>
</template>
<script>
export default {
  name: 'DetailJob',

  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    open() {
      this.isOpen = true;
    },
  },
};
</script>
<style lang="scss">
  
</style>
