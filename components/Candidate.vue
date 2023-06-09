<template>
  <div>
   <Header/>
   <Navbar
    :options="navbarOptions"
    :active-item="activeItem"
    @updateActiveItem="updateActiveItem($event)"
   />
   <ListCvs
    v-if="activeItem === 1"
    :cvs="cvs"
   />
   <ListJobs
    v-if="activeItem === 2"
    :jobs="jobs"
   />
  </div>
</template>
<script>
import Cookie from 'js-cookie';
// import candidateApi from '../api/candidate';
import userCandidate from '~/composables/useCandidate';
import Navbar from './Navbar.vue';
import Header from './Header.vue';
import ListCvs from './ListCvs/index.vue';
import ListJobs from './ListJobs/index.vue'
import { watch } from '@nuxtjs/composition-api';
// import Cookie from 'js-cookie';

export default {
  name: 'CandidatePage',

  components: {
    Navbar,
    ListCvs,
    ListJobs,
    Header,
  },

  // computed: {
  //   token() {
  //     return Cookie.get('access_token');
  //   }
  // },

  setup() {
    const {
      cvs,
      isFetchingCvs,
      fetchCvs,
      jobs,
      isFetchingJobs,
      fetchJobs,
    } = userCandidate();

    const token = Cookie.get('access_token');

    if (token) {
      console.log(token);
      fetchCvs();
      fetchJobs();
    }

    return {
      cvs,
      isFetchingCvs,
      fetchCvs,
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


  methods: {
    // async logout() {
    //   await this.$auth.logout();
    // },
    updateActiveItem(val) {
      this.activeItem = val;
    }
  },
};
</script>
<style lang="scss" scoped>

</style>
