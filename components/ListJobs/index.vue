<template>
  <div>
    {{ jobs }}
  </div>
</template>
<script>
export default {
  name: 'ListJobs',

  props: {
    jobs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="">
  
</style>
