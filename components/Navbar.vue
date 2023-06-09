<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="navbar-menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item v-for="(item, index) in options" :key="index" :index="String(index + 1)">
        {{ item }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'navbar',

  props: {
    options: {
      type: Array,
      default: [],
    },
    activeItem: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      activeIndex: String(this.activeItem),
    };
  },

  // computed: {
  //   activeIndex: {
  //     get() {
  //       return String(this.activeItem);
  //     },
  //     set(val) {
  //       this.$emit('updateActiveItem', val);
  //     },
  //   },
  // },

  methods: {
    handleSelect(key) {
      this.$emit('updateActiveItem', Number(key));
    },
  },
};
</script>
<style lang="scss" scoped>
  
</style>
