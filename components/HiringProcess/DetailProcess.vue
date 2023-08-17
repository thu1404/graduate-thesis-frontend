<template>
  <el-dialog
    :title="processDetail.name"
    :visible.sync="isOpen"
    width="50%"
    @closed="$emit('closed')"
  >
    <div>
      <h1 class="text-2xl font-bold mb-8">
        Hiring process name:
        <span class="font-bold text-pink-500">{{ processDetail.name }}</span>
      </h1>
      <div class="grid grid-cols-2 gap-5">
        <div
          class="col-span-2 bg-white shadow-md text-center py-2 rounded-lg text-lg"
          v-for="(round, index) in processDetail.hiring_process_round"
          :key="index"
        >
          <span>Round {{ index + 1 }}: {{ round.name }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'DetailProcess',

  props: {
    processDetail: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>
