<template>
  <div class="job-card">
    <div class="title">{{ job.title }}</div>
    <div class="content">
      <div class="main__info">
        <div class="main__info--item">
          <div class="main__info--label">
            Description
          </div>
          <div class="main__info--content">
            {{ job.description }}
          </div>
        </div>
        <div class="main__info--item">
          <div class="main__info--label">
            Requirement
          </div>
          <div class="main__info--content">
            {{ job.requirements }}
          </div>
        </div>
        <div class="main__info--item">
          <div class="main__info--label">
            Benefit
          </div>
          <div class="main__info--content">
            {{ job.benefit }}
          </div>
        </div>
      </div>
      <div class="addition__info">
        <div class="addition__info--item">
          <div class="addition__info--label">
            Work location
          </div>
          <div class="addition__info--content">
            {{ job.location }}
          </div>
        </div>
        <div class="addition__info--item">
          <div class="addition__info--label">
            Salary
          </div>
          <div class="addition__info--content">
            {{ job.salary }}
          </div>
        </div>
      </div>
    </div>
    <el-button v-if="job.get_cv.length <= 0" @click="$emit('apply')">Apply</el-button>
  </div>
</template>
<script>
export default {
  name: 'JobCard',

  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.job-card {
  margin: 16px 32px;
  padding: 16px;
  width: 100%;
  border: 1px solid #000;
  border-radius: 4px;
}
  .content {
    display: flex;
    justify-content: space-between;
  }
</style>
