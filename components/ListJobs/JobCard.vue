<template>
  <div class="job-card">
    <div class="title" @click="openKanban(job.id)">{{ job.title }}</div>
    <div class="content">
      <div class="main__info">
        <div class="main__info--item">
          <div class="main__info--label">Description</div>
          <div class="main__info--content">
            {{ job.description }}
          </div>
        </div>
        <div class="main__info--item">
          <div class="main__info--label">Requirement</div>
          <div class="main__info--content">
            {{ job.requirements }}
          </div>
        </div>
        <div class="main__info--item">
          <div class="main__info--label">Benefit</div>
          <div class="main__info--content">
            {{ job.benefit }}
          </div>
        </div>
      </div>
      <div class="additional__info">
        <div class="additional__info--item">
          <div class="additional__info--label">Work location</div>
          <div class="additional__info--content">
            {{ job.location }}
          </div>
        </div>
        <div class="additional__info--item">
          <div class="additional__info--label">Salary</div>
          <div class="additional__info--content">
            {{ job.salary }}
          </div>
        </div>
      </div>
    </div>
    <el-button v-if="$auth.user?.role_id === 1" @click="$emit('edit')"
      >Edit</el-button
    >
    <el-button v-if="job.get_cv?.length <= 0" @click="$emit('apply')"
      >Apply</el-button
    >
  </div>
</template>
<script>
export default {
  name: "JobCard",

  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    openKanban(id) {
      if (this.$auth.user?.role_id === 1) {
        this.$emit("openKanban", id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.job-card {
  margin: 16px 32px;
  padding: 16px;
  width: 100%;
  // border: 1px solid #000;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  .title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 12px;
  }
  .main__info,
  .additional__info {
    &--item {
      margin-bottom: 8px;
    }
    &--label {
      font-weight: 600;
    }
  }
}
.content {
  display: flex;
  justify-content: space-between;
}
</style>
