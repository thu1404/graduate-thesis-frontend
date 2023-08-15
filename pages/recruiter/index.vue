<template>
  <div>
    <Header />
    <ListJobs :jobs="hrJobs" :skills="skills" @reloadList="fetchHrJobs" />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import ListJobs from "~/components/ListJobs/index.vue";
import useJob from "~/composables/useJob";
import useSkill from "../../composables/useSkill";

export default {
  name: "HRJob",

  components: {
    Header,
    ListJobs,
  },

  setup() {
    const { hrJobs, isFetchingHrJobs, fetchHrJobs } = useJob();

    const {
      skills,
      fetchSkills,
    } = useSkill();

    // fetchHrJobs();

    return {
      hrJobs,
      isFetchingHrJobs,
      fetchHrJobs,
      skills,
      fetchSkills,
    };
  },

  mounted() {
    this.fetchHrJobs();
    this.fetchSkills();
  },
};
</script>
<style lang="scss"></style>
