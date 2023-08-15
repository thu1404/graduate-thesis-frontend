<template>
  <div>
   <Header @logout="logout"/>
   <Navbar
    :options="navbarOptions"
    :active-item="activeItem"
    @updateActiveItem="updateActiveItem($event)"
   />
   <ListCvs
    v-if="activeItem === 1"
   />
   <ListJobs
    v-if="activeItem === 2"
    :jobs="jobs"
    @applyJob="fetchJobs"
   />
  </div>
</template>
<script>
import Cookie from 'js-cookie';
import authApi from '../api/auth';
import userCandidate from '~/composables/useCandidate';
import Navbar from './Navbar.vue';
import Header from './Header.vue';
import ListCvs from './ListCvs/index.vue';
import ListJobs from './ListJobs/index.vue';

export default {
  name: 'CandidatePage',

  components: {
    Navbar,
    ListCvs,
    ListJobs,
    Header,
  },

  setup() {
    const {
      jobs,
      isFetchingJobs,
      fetchJobs,
    } = userCandidate();

    const token = Cookie.get('access_token');

    fetchJobs();

    return {
      jobs,
      isFetchingJobs,
      fetchJobs,
    };
  },

  data() {
    return {
      navbarOptions: ['My profiles', 'Find jobs'],
      activeItem: 1,
      token: Cookie.get('access_token'),
    };
  },

  computed: {
    candidateJobs() {
      return this.jobs.map((job) => {
        return {
          id: job.id,
          title: job.title,
          requirements: job.requirements,
          description: job.description,
          benefit: job.benefit,
          salary: job.salary,
          location: job.location,
          applied: job.get_cv.length > 0,
        };
      });
    },
  },

  methods: {
    async logout() {
      await authApi.logout();
    },
    updateActiveItem(val) {
      this.activeItem = val;
    }
  },
};
</script>
<style lang="scss" scoped>

</style>
