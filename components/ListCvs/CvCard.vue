<template>
  <div class="info-card">
    <div class="info-card__avatar">
      <img v-if="avatar !== ''" :src="avatar" alt="avatar">
      <img v-else src="../../assets/images/default-avatar.jpg" alt="avatar">
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
    <el-button v-if="isApply" type="primary" @click="$emit('apply')">Apply</el-button>
    <div v-else>
      <el-button type="primary" @click="$emit('update')">Edit</el-button>
      <el-button type="danger" @click="$emit('delete')">Delete</el-button>
    </div>
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
    isApply: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    avatar() {
      if (this.cv.avatar) {
        return 'http://localhost:8000' + this.cv.avatar;
      } else {
        return '';
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
  // border: 1px solid black;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  width: 240px;
  height: 380px;
  padding: 8px;
  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px;
    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }
  }
  &__content {
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    & > div {
      margin-bottom: 8px;
    }
    &--name {
      font-weight: 700;
    }
  }
}
</style>
