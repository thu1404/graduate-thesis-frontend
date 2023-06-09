<template>
  <div>
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
import axios from '~/utils/axios';

export default {
  name: 'LoginPage',
  // middleware: ['authenticate'],
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
      Cookie.set('access_token', response.data.access_token);
      console.log(response.data);
      this.storeUser(response.data.data);
    },
    // async login() {
    //   try {
    //     const payloads = {
    //       email: this.form.email,
    //       password: this.form.password,
    //     };
    //     const response = await axios.post('/login', payloads);
    //     console.log(response.data);
    //   } catch(error) {
    //     console.log(error);
    //   }
    // }
  },
}
</script>
<style lang="scss" scoped>

</style>
