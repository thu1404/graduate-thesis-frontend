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
    </div>
    <!-- <pre>
      {{ cvs }}
    </pre> -->
    <el-button @click="handleOpenCreate">add profile</el-button>
    <DetailCv
      ref="detailCvModal"
      :cv="selectedCv"
    />
    <CreateCv
      ref="createCvModal"
      @submit="fetchCvs"
    />
    <UpdateCv
      ref="updateCvModal"
      @submit="fetchCvs"
    />
  </div>
</template>
<script>
import CvCard from './CvCard.vue';
import DetailCv from '../Cv/index.vue';
import CreateCv from '../Cv/CreateCv.vue';
import UpdateCv from '../Cv/UpdateCv.vue';
import userCandidate from '~/composables/useCandidate';

export default {
  name: 'ListCvs',

  components: {
    CvCard,
    DetailCv,
    CreateCv,
    UpdateCv,
  },

  // props: {
  //   cvs: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },

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
</style>
