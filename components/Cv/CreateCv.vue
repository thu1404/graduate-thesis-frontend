<template>
  <el-dialog
    title="Add new profile"
    :visible.sync="isOpen"
    width="50%"
    @close="clearForm"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item>
<!--        <el-input v-model="form.avatar" type="file" @change="handleSelectAvatar" />-->
        <input type="file"  @change="handleSelectAvatar"  ref="file">
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
      <el-select v-model="listSkillSelected" multiple placeholder="Select">
        <el-option
          v-for="item in listSkill"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-form-item prop="cv_file" label="CV file">
        <input type="file"  @change="handleSelectCv"  ref="fileCv">
      </el-form-item>
      <el-button @click="handleCreate">Create</el-button>
    </el-form>
  </el-dialog>
</template>
<script>
import candidateApi from '~/api/candidate';
import skillsApi from '~/api/skills'
export default {
  name: 'CreateCv',

  data() {
    return {
      isOpen: false,
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
        cv_file: null,
      },
      rules: {
        name: {
          required: true,
          message: 'Name is required',
          trigger: ['blur', 'change'],
        },
        age: {
          required: true,
          message: 'Age is required',
          trigger: ['blur', 'change'],
        },
        phone: {
          required: true,
          message: 'Phone number is required',
          trigger: ['blur', 'change'],
        },
        email: {
          required: true,
          message: 'Email is required',
          trigger: ['blur', 'change'],
        },
        address: {
          required: true,
          message: 'Address is required',
          trigger: ['blur', 'change'],
        },
        position: {
          required: true,
          message: 'Prefer position is required',
          trigger: ['blur', 'change'],
        },
      },
      listSkill: [],
      listSkillSelected: []
    };
  },

  created() {
    this.getListSkills()
  },


  methods: {
    open() {
      this.isOpen = true;
    },
    handleSelectAvatar() {
      const fileInput = this.$refs.file
      const imgFile = fileInput.files
      this.form.avatar = imgFile[0]
    },
    handleSelectCv() {
      const fileInput = this.$refs.fileCv
      const imgFile = fileInput.files
      this.form.cv_file = imgFile[0]
    },
    handleCreate() {
      this.$refs.form.validate(async(valid) => {
        if(!valid) {
          return;
        }
        try {
          const formData = new FormData()
          for(const key in this.form) {
            formData.append(key, this.form[key])
          }
          this.listSkillSelected.forEach((skill) => {
            formData.append(`skills[]`, JSON.stringify(skill));
          });
        await candidateApi.createCv(formData);
        this.$emit('submit');
        this.isOpen = false;
        } catch (error) {
          console.log(error);
        }
      });
      this.clearForm();
    },
    clearForm() {
      this.form = {
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
        skill: '',
        cv_file: null,
      };
      this.$refs.form.clearValidate();
    },
    async getListSkills() {
      try {
          const response = await skillsApi.getListSkills()
          this.listSkill = response.data.skills
      }
      catch (e) {
        console.log(e)
      }
    }
  },
};
</script>
<style lang="scss">

</style>
