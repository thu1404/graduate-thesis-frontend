<template>
  <div>
    <div class="cv-card__list">
      <div v-for="(cv, index) in cvs" :key="index" class="cv-card__item">
        <CvCard
          :cv="cv"
          @openDetail="handleOpenDetailCv(cv)"
        />
      </div>
    </div>
    <!-- <pre>
      {{ cvs }}
    </pre> -->
    <el-button @click="handleOpenCreate">add profile</el-button>
    <CreateCv
      ref="createCvModal"
    />
    <DetailCv
      ref="detailCvModal"
      :cv="selectedCv"
    />
  </div>
</template>
<script>
import CvCard from './CvCard.vue';
import DetailCv from '../Cv/index.vue';
import CreateCv from '../Cv/CreateCv.vue';

export default {
  name: 'ListCvs',

  components: {
    CvCard,
    DetailCv,
    CreateCv,
  },

  props: {
    cvs: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedCv: {},
    };
  },

  methods: {
    handleOpenDetailCv(cv) {
      this.selectedCv = cv;
      this.$refs.detailCvModal.open();
    },
    handleOpenCreate() {
      this.$refs.createCvModal.open();
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
