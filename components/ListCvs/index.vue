<template>
  <div>
    <div class="cv-card__list">
      <div v-for="(cv, index) in cvs" :key="index" class="cv-card__item">
        <CvCard
          :cv="cv"
          @openDetail="handleOpenDetailCv(cv)"
          @update="handleOpenUpdateCv(cv)"
        />
      </div>
      <div class="cv-card__add">
        <el-button type="primary" @click="handleOpenCreate">add profile</el-button>
      </div>
    </div>
    <DetailCv
      ref="detailCvModal"
      :cv="selectedCv"
    />
    <CreateCv
      ref="createCvModal"
      @submit="refreshCVs"
    />
    <UpdateCv
      ref="updateCvModal"
      @submit="refreshCVs"
    />
  </div>
</template>
<script>
import CvCard from './CvCard.vue';
import DetailCv from '../Cv/index.vue';
import CreateCv from '../Cv/CreateCv.vue';
import UpdateCv from '../Cv/UpdateCv.vue';
// import userCandidate from '~/composables/useCandidate';

export default {
  name: 'ListCvs',

  components: {
    CvCard,
    DetailCv,
    CreateCv,
    UpdateCv,
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
    handleOpenUpdateCv(cv) {
      this.$refs.updateCvModal.open(cv);
    },
    refreshCVs() {
      this.$emit('updateCVs')
    }
  },


};
</script>
<style lang="scss" scoped>
.cv-card__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin: 16px;
}
.cv-card__add {
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid black;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  width: 240px;
  height: 396px;
  // padding: 8px;
}
</style>
