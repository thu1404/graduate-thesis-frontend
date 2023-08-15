<template>
  <el-dialog
    title="Create process"
    :visible.sync="isOpen"
    width="50%"
    @close="clearForm"
    @closed="$emit('closed')"
  >
    <el-form ref="form" :model="form" >
      <el-form-item
        prop="name"
        :rules="rules.name"
        label="Hiring process name"
      >
        <el-input
          v-model="form.name"
          type="text"
          placeholder="Enter hiring process name"
        />
      </el-form-item>
      <el-form-item
        v-for="(round, index) in form.rounds"
        :key="index"
        :label="'Round ' + (index + 1)"
      >
        <el-input
          v-model="round.name"
          type="text"
          placeholder="Enter round name"
          class="round-input"
        />
        <span class="delete-round" @click="deleteRound(index)"> Delete </span>
      </el-form-item>
    </el-form>
    <el-button
      @click="addRound"
      type="primary"
    >
      Add round
    </el-button>
    <el-button
      @click="addHiringProcess"
      type="success"
    >
      Save
    </el-button>
  </el-dialog>
</template>
<script>
import HiringProcessApi from '../../api/hiringProcess'

export default {
  name: 'CreateProcess',

  data() {
    return {
      isOpen: false,
      form: {
        name: '',
        rounds: [
          { name: '' },
          { name: '' },
        ]
      },
      rules: {
        name: {
          required: true,
          message: 'Hiring process name is required',
          trigger: ['blur', 'change'],
        },
      },
    };
  },

  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
      this.clearForm();
    },
    addRound() {
      this.form.rounds.push({ name: '' });
    },
    deleteRound(index) {
      if (this.form.rounds.length <= 2) {
        this.checkMinimumRounds();
        return;
      }
      this.form.rounds.splice(index, 1);
    },
    checkMinimumRounds() {
      this.$notify({
        title: "Must have atleast 2 rounds",
        type: "error",
      });
    },
    checkRoundName() {
      for (let i=0; i < this.form.rounds.length; i++) {
        if (this.form.rounds[i].name.trim() === '') {
          this.$notify({
            title: "Round name is required",
            type: "error",
          });
          return false;
        }
      }
      return true;
    },
    clearForm() {
      this.form = {
        name: '',
        rounds: [
          { name: '' },
          { name: '' },
        ],
      },
      this.$refs.form.clearValidate();
    },
    async addHiringProcess() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return;
        }
        if (!this.checkRoundName()) {
          return;
        }
        const payloads = {
          name: this.form.name,
          hiring_process_round: this.form.rounds,
        };
        try {
          const response = await HiringProcessApi.createProcess(payloads);
          this.close();
          this.$emit('addProcess');
        } catch (e) {
          console.log(e);
        }
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.delete-round {
  flex-wrap: nowrap;
  margin-left: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.round-input {
  width: 80%;
  display: inline-block;
}
</style>
