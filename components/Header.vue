<template>
  <div class="header">
    <div class="logo">
      <img class="logo-img" src="../assets/images/logo2-removebg.png" alt="Easy Hiring">
    </div>
    <div v-if="$auth?.loggedIn" class="navigation">
      <div v-if="$auth.user?.role_id === 1" class="navigation__list">
        <span @click="redirectHRJob" :class="['navigation__item', {'active': $route.path === '/recruiter'}]">
          Jobs List
        </span>
        <span @click="redirectHRProcess" :class="['navigation__item', {'active': $route.path === '/recruiter/process'}]">
          Hiring Processes
        </span>
      </div>
      <div v-else class="navigation__list">
        <span @click="redirectCandidateJob" :class="['navigation__item', {'active': $route.path === '/candidate/jobs'}]">
          Find Jobs
        </span>
        <span @click="redirectCandidateProfile" :class="['navigation__item', {'active': $route.path === '/candidate'}]">
          Your Profiles
        </span>
      </div>
    </div>
    <div class="action">
      <el-button v-if="$auth?.loggedIn" @click="logout">Logout</el-button>
      <el-button v-else @click="register">Sign Up</el-button>
    </div>
  </div>
</template>
<script>
import authApi from '../api/auth';

export default {
  name: 'Header',

  methods: {
    async logout() {
      // try {
      //   const response = await authApi.logout();
      //   if (response.status === 200) {
      //     this.$router.push('/login');
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
      await this.$auth.logout();
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
    },
    redirectCandidateProfile() {
      if(this.$auth.user?.role_id === 2) {
        this.$router.push('/candidate');
      }
    },
    redirectCandidateJob() {
      if(this.$auth.user?.role_id === 2) {
        this.$router.push('/candidate/jobs');
      }
    },
    redirectHRJob() {
      if(this.$auth.user?.role_id === 1) {
        this.$router.push('/candidate');
      }
    },
    redirectHRProcess() {
      if(this.$auth.user?.role_id === 1) {
        this.$router.push('/candidate/process');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  margin-bottom: 32px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  .logo {
    height: 48px;
    width: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    &-img {
      height: 40px;
    }
  }
  .navigation {
    &__list {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    &__item {
      cursor: pointer;
    }
    .active {
      color: #5CE1E6;
    }

  }
}
</style>