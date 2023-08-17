<template>
  <el-dialog
    title="Edit Job"
    :visible.sync="isOpen"
    @closed="clearForm"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        prop="title"
        label="Title"
      >
        <el-input v-model="form.title" type="text" placeholder="Enter title"/>
      </el-form-item>
      <el-form-item
        prop="requirements"
        label="Requirements"
      >
        <el-input v-model="form.requirements" type="text" placeholder="Enter requirements"/>
      </el-form-item>
      <el-form-item
        prop="description"
        label="Description"
      >
        <el-input v-model="form.description" type="text" placeholder="Enter description"/>
      </el-form-item>
      <el-form-item
        prop="benefit"
        label="Benefit"
      >
        <el-input v-model="form.benefit" type="text" placeholder="Enter benefit"/>
      </el-form-item>
      <el-form-item
        prop="hiring_process"
        label="Hiring process"
      >
        <el-select
          v-model="form.hiring_process"
          placeholder="Select hiring process"
        >
          <el-option
            v-for="(item, index) in listProcess"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="location"
        label="Location"
      >
        <el-input v-model="form.location" type="text" placeholder="Enter location"/>
      </el-form-item>
      <el-form-item
        prop="salary"
        label="Salary"
      >
        <el-input v-model="form.salary" type="text" placeholder="Enter salary"/>
      </el-form-item>

      <el-form-item label="Skills">
        <el-select v-model="form.skills" multiple placeholder="Select skills">
          <el-option
            v-for="item in skills"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-button @click="submit">Save</el-button>
    </el-form>
  </el-dialog>
</template>
<script>
import useProcess from '../../composables/useProcess';
import hrJobApi from '../../api/hrJob';
import useSkill from '../../composables/useSkill';

export default {
  name: 'UpdateJob',

  setup() {
    const {
      listProcess,
      isFetchingListProcess,
      fetchListProcess,
    } = useProcess();

    const {
      skills,
      fetchSkills,
    } = useSkill();

    fetchListProcess();
    fetchSkills();

    return {
      listProcess,
      isFetchingListProcess,
      fetchListProcess,
      skills,
      fetchSkills,
    };
  },

  data() {
    return {
      isOpen: false,
      form: {
        title: '',
        requirements: '',
        description: '',
        benefit: '',
        hiring_process: '',
        location: '',
        salary: '',
        skills: [],
      },
      job_id: null,
      rules: {
        title: {
          required: true,
          message: 'Name is required',
          trigger: ['blur', 'change'],
        },
        requirements: {
          required: true,
          message: 'Requirements is required',
          trigger: ['blur', 'change'],
        },
        description: {
          required: true,
          message: 'Description is required',
          trigger: ['blur', 'change'],
        },
        benefit: {
          required: true,
          message: 'Benefit is required',
          trigger: ['blur', 'change'],
        },
        hiring_process: {
          required: true,
          message: 'Hiring process is required',
          trigger: ['blur', 'change'],
        },
        location: {
          required: true,
          message: 'Location is required',
          trigger: ['blur', 'change'],
        },
        salary: {
          required: true,
          message: 'Salary is required',
          trigger: ['blur', 'change'],
        },
      }
    };
  },

  methods: {
    open(job) {
      this.isOpen = true;
      this.form = {
        title: job.title,
        requirements: job.requirements,
        description: job.description,
        benefit: job.benefit,
        hiring_process: job.hiring_process.id,
        location: job.location,
        salary: job.salary,
        skills: job.skills.map((skill) => skill.id),
      };
      this.job_id = job.id;
    },
    submit() {
      this.$refs.form.validate(async(valid) => {
        if(!valid) {
          return;
        }
        try {
          await hrJobApi.updateJob(this.job_id ,this.form);
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
        title: '',
        requirements: '',
        description: '',
        benefit: '',
        hiring_process: '',
        location: '',
        salary: '',
        skills: [],
      };
      this.$refs.form.clearValidate();
    },
  }
};
</script>
<style lang="scss" scoped>
  
</style>
