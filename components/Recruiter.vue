<template>
  <div>
    <Header/>
    <ListJobs :jobs="hrJobs" @reloadList="fetchHrJobs"/>
  </div>
</template>
<script>
import Header from './Header.vue';
import ListJobs from './ListJobs/index.vue';
import useJob from '~/composables/useJob';

export default {
  name: 'HRPage',

  components: {
    Header,
    ListJobs,
  },

  setup() {
    const {
      hrJobs,
      isFetchingHrJobs,
      fetchHrJobs,
    } = useJob();

    fetchHrJobs();

    return {
      hrJobs,
      isFetchingHrJobs,
      fetchHrJobs,
    };
  },
};
</script>
<style lang="scss" scoped>
  
</style>
