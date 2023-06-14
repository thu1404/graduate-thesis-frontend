<template>
  <el-drawer
    title="Apply your profile to this job"
    :visible.sync="isOpen"
    direction="btt"
    size="60%"
  >
    <div class="cv-card__list">
      <div v-for="(cv, index) in cvs" :key="index" class="cv-card__item">
        <CvCard
          :cv="cv"
          is-apply
          @apply="handleApply(cv.id)"
        />
      </div>
    </div>
  </el-drawer>
</template>
<script>
import userCandidate from '~/composables/useCandidate';
import candidateApi from '~/api/candidate';
import CvCard from '../ListCvs/CvCard.vue';

export default {
  name: 'ApplyJobDrawer',

  components: {
    CvCard,
  },

  setup() {
    const {
      cvs,
      isFetchingCvs,
      fetchCvs,
    } = userCandidate();

    fetchCvs();

    return {
      cvs,
      isFetchingCvs,
      fetchCvs,
    };
  },

  data() {
    return {
      isOpen: false,
      job_id: null,
    };
  },

  methods: {
    open(jobId) {
      this.job_id = jobId;
      this.isOpen = true;
    },
    async handleApply(cvId) {
      try {
        await candidateApi.applyJob({
          cv_id: cvId,
          job_id: this.job_id,
        });
        this.$emit('apply');
        this.isOpen = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.cv-card__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
}
</style>
