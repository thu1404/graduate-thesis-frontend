<template>
  <div>
    <Header />
    <ListJobs :jobs="hrJobs" @reloadList="fetchHrJobs" />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import ListJobs from "~/components/ListJobs/index.vue";
import useJob from "~/composables/useJob";

export default {
  name: "HRJob",

  components: {
    Header,
    ListJobs,
  },

  setup() {
    const { hrJobs, isFetchingHrJobs, fetchHrJobs } = useJob();

    // fetchHrJobs();

    return {
      hrJobs,
      isFetchingHrJobs,
      fetchHrJobs,
    };
  },

  mounted() {
    this.fetchHrJobs();
  },
};
</script>
<style lang="scss"></style>
