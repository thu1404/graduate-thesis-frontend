<template>
  <div>
    <Header />
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item prop="name" label="Your name">
        <el-input v-model="form.name" type="text" placeholder="Enter your name"/>
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input v-model="form.email" type="email" placeholder="Enter email"/>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="form.password" type="password" placeholder="Enter password"/>
      </el-form-item>
      <el-form-item label="Are you">
        <el-radio v-model="form.role" :label="2">Candidate (Looking for jobs)</el-radio>
        <el-radio v-model="form.role" :label="1">Recruiter</el-radio>
      </el-form-item>
      <el-button @click="register">Sign up</el-button>
    </el-form>
    <span @click="login">Already have an account? Log In</span>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import authApi from '../api/auth';

export default {
  name: 'RegisterPage',

  components: {
    Header,
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        role: 2,
      },
      rules: {
        name: {
          required: true,
          message: 'Name is required',
          trigger: ['blur', 'change'],
        },
        email: {
          required: true,
          message: 'Email is required',
          trigger: ['blur', 'change'],
        },
        password: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
      }
    };
  },

  methods: {
    // ...mapActions({
    //   storeUser: 'modules/user/storeUser',
    // }),
    async register() {
      try {
        const response = await authApi.register({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          role: this.form.role,
        });
        if (response.status === 200) {
          this.$router.push('/login');
        }
      } catch (e) {
        console.log(e);
      }
    },
    login() {
      this.$router.push('/login');
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
