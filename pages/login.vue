<template>
  <div>
    <Header />
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item prop="email" label="Email">
        <el-input v-model="form.email" type="email" placeholder="Enter email"/>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="form.password" type="password" placeholder="Enter password"/>
      </el-form-item>
      <el-button @click="login">Login</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import Cookie from 'js-cookie';
import Header from '../components/Header.vue';

export default {
  name: 'LoginPage',
  // middleware: ['authenticate'],

  components: {
    Header,
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
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
    ...mapActions({
      storeUser: 'modules/user/storeUser',
    }),
    async login() {
      const response = await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.form.email,
          password: this.form.password,
        }
      });
      await Cookie.set('access_token', response.data.access_token);
      // console.log(response.data.csrfToken);
      // this.storeUser(response.data.data);
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
