<template>
  <el-drawer
    title="Job kanbans board"
    :visible.sync="dialogVisiable"
    direction="btt"
    :before-close="handleClose"
    size="90%"
  >
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="analytic">
        <div class="round-list">
          <div
            class="round-item"
            v-for="(round, index) in hiringProgressRound"
            :key="round.id"
          >
            <h1>{{ round.name }}</h1>
            <div>
              <div>
                <span
                  >Pass: {{ listRender[index].resolve.length }}/{{
                    kanBanProgress.length
                  }}({{ caculatePer(listRender[index].resolve.length) }})
                </span>
                <span
                  >Reject: {{ listRender[index].reject.length }}/{{
                    kanBanProgress.length
                  }}({{ caculatePer(listRender[index].reject.length) }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="kanban">Config</el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      activeName: "analytic",
      dialogVisiable: false,
    };
  },
  props: {
    hiringProgressRound: {
      type: Array,
      default: () => [],
    },
    kanBanProgress: {
      type: Array,
      default: () => [],
    },
    listRender: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.dialogVisiable = this.isOpen;
  },
  watch: {
    isOpen: {
      handler() {
        this.dialogVisiable = this.isOpen;
      },
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    caculatePer(count) {
      return ((count / this.kanBanProgress.length) * 100).toFixed(2);
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
