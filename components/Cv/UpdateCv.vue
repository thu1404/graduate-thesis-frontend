<template>
  <el-dialog
    title="Add new profile"
    :visible.sync="isOpen"
    width="50%"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item>
        <el-input v-model="form.avatar" type="file" @change="handleSelectAvatar" />
      </el-form-item>
      <el-form-item prop="name" label="Name">
        <el-input v-model="form.name" type="text" placeholder="Enter name" />
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input v-model="form.email" type="email" placeholder="Enter Email"/>
      </el-form-item>
      <el-form-item prop="phone" label="phone">
        <el-input v-model="form.phone" type="text" placeholder="Enter phone number" />
      </el-form-item>
      <el-form-item prop="age" label="Age">
        <el-input v-model="form.age" type="number" placeholder="Enter your age" />
      </el-form-item>
      <el-form-item prop="gender" label="Gender">
        <el-radio v-model="form.gender_id" :label="1">Male</el-radio>
        <el-radio v-model="form.gender_id" :label="2">Female</el-radio>
      </el-form-item>
      <el-form-item prop="address" label="Address">
        <el-input v-model="form.address" type="text" placeholder="Enter your address"/>
      </el-form-item>
      <el-form-item prop="position" label="Prefer position">
        <el-input v-model="form.position" type="text" placeholder="Enter your prefer position"/>
      </el-form-item>
      <el-form-item prop="education" label="Educations">
        <el-input v-model="form.education" type="text" placeholder="Enter your educations"/>
      </el-form-item>
      <el-form-item prop="experience" label="Experience">
        <el-input v-model="form.experience" type="text" placeholder="Enter your experiences"/>
      </el-form-item>
      <el-form-item prop="skill" label="Skill">
        <el-input v-model="form.skills" type="text" placeholder="Enter your skill"/>
      </el-form-item>
      <el-form-item prop="cv_file" label="CV file">
        <el-input v-model="form.cv_file" type="file" @change="handleSelectCv" />
      </el-form-item>
      <el-button @click="handleUpdate">Save</el-button>
    </el-form>
  </el-dialog>
</template>
<script>
import candidateApi from '~/api/candidate';

export default {
  name: 'UpdateCv',

  data() {
    return {
      isOpen: false,
      cv_id: '',
      form: {
        name: '',
        avatar: null,
        age: null,
        gender_id: null,
        phone: '',
        email: '',
        address: '',
        position: '',
        education: '',
        experience: '',
        skills: '',
        cv_file: null,
      },
      rules: {
        name: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
        age: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
        phone: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
        email: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
        address: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
        position: {
          required: true,
          message: 'Password is required',
          trigger: ['blur', 'change'],
        },
      }
    };
  },

  methods: {
    open(cv) {
      this.cv_id = cv.id;
      this.form = {
        name: cv.name,
        // avatar: cv.avatar,
        age: cv.age,
        gender_id: cv.gender_id,
        phone: cv.phone,
        email: cv.email,
        address: cv.address,
        position: cv.position,
        education: cv.education,
        experience: cv.experience,
        skills: cv.skills,
        // cv_file: cv.cv_file,
      };
      this.isOpen = true;
    },
    handleSelectAvatar(event) {
      this.form.avatar = event.target.file[0];
    },
    handleSelectCv(event) {
      this.form.cv_file = event.target.file[0];
    },
    handleUpdate() {
      this.$refs.form.validate(async(valid) => {
        if(!valid) {
          return;
        }
        try {
        await candidateApi.updateCv(this.form, this.cv_id);
        this.$emit('submit');
        this.isOpen = false;
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
};
</script>
<style lang="scss">
  
</style>
