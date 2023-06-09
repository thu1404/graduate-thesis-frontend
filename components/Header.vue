<template>
  <div class="header">
    <div class="logo">
      <img class="logo-img" src="../assets/images/logo2-removebg.png" alt="Easy Hiring">
    </div>
    <div class="action">
      <el-button @click="logout">Logout</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',

  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  .logo {
    height: 48px;
    width: 200px;
    overflow: hidden;
    &-img {
      height: 40px;
    }
  }
}
</style>