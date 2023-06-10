<template>
  <div class="info-card">
    <div class="info-card__avatar">
      <img :src="avatar" alt="avatar">
      <!-- <img src="../../assets/images/default-avatar.jpg" alt=""> -->
    </div>
    <div class="info-card__content">
      <div class="info-card__content--name" @click="$emit('openDetail')">
        {{ cv.name }}
      </div>
      <div class="info-card__content--position">
        {{ cv.position }}
      </div>
      <div class="info-card__content--phone">
        {{ cv.phone }}
      </div>
      <div class="info-card__content--email">
        {{ cv.email }}
      </div>
    </div>
    <el-button @click="$emit('update')">Edit</el-button>
  </div>
</template>
<script>
export default {
  name: 'CvCard',

  props: {
    cv: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    avatar() {
      if (this.cv.avatar) {
        return 'http://localhost:8000' + this.cv.avatar;
      } else {
        return '/_nuxt/assets/images/default-avatar.jpg';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  width: 240px;
  height: 360px;
  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: contain;
    }
  }
}
</style>
