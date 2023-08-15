<template>
  <div>
    <Header />
    <!-- <div v-if="$auth?.loggedIn">
      <Welcome />
    </div>

    <div v-else>
      <Unauthenticated/>
    </div> -->
    <ListJobs
      :jobs="filteredJobs.length === 0 ? jobs : filteredJobs"
      :skills="skills"
      @applyJob="fetchJobs"
      @search="search"
    />
  </div>
</template>

<script>
import Unauthenticated from '../components/Unauthenticated.vue';
import Welcome from '../components/Welcome.vue';
import Header from '../components/Header.vue';
import userCandidate from '~/composables/useCandidate';
import ListJobs from "../components/ListJobs/index.vue";
import useSkill from '../composables/useSkill';

export default {
  name: 'IndexPage',

  components: {
    Unauthenticated,
    Welcome,
    Header,
    ListJobs,
  },

  setup() {
    const {
      jobs,
      isFetchingJobs,
      fetchJobs,
    } = userCandidate();

    const {
      skills,
      fetchSkills
    } = useSkill();

    // fetchJobs();

    return {
      jobs,
      isFetchingJobs,
      fetchJobs,
      skills,
      fetchSkills,
    };
  },

  data() {
    return {
      filteredJobs: [],
    };
  },

  methods: {
    search(search) {
      const params = new URLSearchParams();

      // Convert each skill to skill_id[]=value format
      if (search.skills !== []) {
        search.skills.forEach(skill => {
          params.append('skill_id[]', skill);
        });
        this.fetchJobs(params);
      }

      if (search.keyword !== '' && search.salary !== '') {
        this.filteredJobs = this.searchJobsByTitle(this.jobs, search.keyword);
        this.filteredJobs = this.filterJobsBySalary(this.filteredJobs, search.salary);
        this.filter(search, this.filteredJobs);
      } else if(search.salary !== '') {
        this.filteredJobs = this.filterJobsBySalary(this.jobs, search.salary);
        this.filter(search, this.filteredJobs);
      } else {
        this.filter(search, this.jobs);
      }


    },

    filter(search, jobs) {
      switch(search.filter) {
        case 1: {
          this.filteredJobs = this.sortByNewestToOldest(jobs);
          break;
        }
        case 2: {
          this.filteredJobs = this.sortByOldestToNewest(jobs);
          break;
        }
        case 3: {
          this.filteredJobs = this.sortByTitleAZ(jobs);
          break;
        }
        case 4: {
          this.filteredJobs = this.sortByTitleZA(jobs);
          break;
        }
        default:
          break;
      };
    },

    // Sort by oldest to newest based on created_at
    sortByOldestToNewest(jobs) {
      return jobs.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    },

    // Sort by newest to oldest based on created_at
    sortByNewestToOldest(jobs) {
      return jobs.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    // Sort A-Z based on title
    sortByTitleAZ(jobs) {
      return jobs.slice().sort((a, b) => a.title.localeCompare(b.title));
    },

    // Sort Z-A based on title
    sortByTitleZA(jobs) {
      return jobs.slice().sort((a, b) => b.title.localeCompare(a.title));
    },

    searchJobsByTitle(jobs, keyword) {
      keyword = keyword.toLowerCase();
      return jobs.filter(job => job.title.toLowerCase().includes(keyword));
    },

    filterJobsBySalary(jobs, minimumSalary) {
      return jobs.filter(job => job.salary >= minimumSalary);
    },

  },

  mounted() {
    this.fetchJobs();
    this.fetchSkills();
  }

};
</script>
