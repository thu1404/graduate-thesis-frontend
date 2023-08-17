<template>
  <el-drawer
    title="Job kanbans board"
    :visible.sync="dialogVisible"
    direction="btt"
    :before-close="handleClose"
    size="90%"
  >
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="analytic ">
        <div class="grid grid-cols-4 gap-3 mt-10 px-4">
          <div
            class="col-span-1 text-center shadow-lg rounded-xl bg-white py-2"
            v-for="(round, index) in hiringProgressRound"
            :key="round.id"
          >
            <div class="py-2">
              <h1 class="w-full font-bold mb-2 text-2xl">{{ round.name }}</h1>
              <div class="w-full">
                <div>
                  <span>
                    <span class="font-bold label__success">Pass:</span>
                    {{ listRender[index].resolve.length }}/{{ kanBanProgress.length }}({{ calculatePer(listRender[index].resolve.length) }}%)
                  </span>
                  <span>
                    <span class="font-bold label__danger">Reject:</span>
                    {{ listRender[index].reject.length }}/{{ kanBanProgress.length }}({{ calculatePer(listRender[index].reject.length) }}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="kanban">
        <div class="grid grid-cols-5 gap-3 px-4">
          <div
            v-for="(board, index) in dataBoard"
            class="col-span-1 bg-white shadow-md mb-4"
            :data-column="board.id"
            :key="index"
            style="min-height: 200px; height: 100%"
          >
            <h3 class="text-center txxt-lg font-bold my-2 mb-4">
              {{ board.name }}
            </h3>
            <draggable
              :group="{ name: 'columns', pull: board.id !== 0 }"
              v-model="board.items"
              :data-column="board.id"
              @end="onEndDrag"
              @start="onStartDrag"
              style="min-height: 200px"
            >
              <div v-for="(item, index) in board.items" :key="index">
                <cv-item
                  :item="item"
                  :hiringProgressRound="hiringProgressRound"
                  @rejectCv="rejectCv"
                  @reloadList="$emit('reloadList')"
                  @openCV="handleOpenDetailCv(item.cv)"
                  :disableButton="board.id === 0"
                />
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <DetailCv
      ref="detailCvModal"
      :cv="selectedCv"
    />
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import hrJob from "../../api/hrJob";
import CvItem from "./CvItem.vue";
import DetailCv from '../Cv/index.vue';

export default {
  name: 'Kanban',

  components: {
    draggable,
    CvItem,
    DetailCv,
  },

  data() {
    return {
      activeName: "analytic",
      dialogVisible: false,
      dataBoardRender: [],
      visible: false,
      rejectCvData: {},
      selectedCv: {},
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
    dataBoard: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // console.log({ dataBoard: this.dataBoard });
    this.dialogVisible = this.isOpen;
    this.dataBoardRender = this.dataBoard;
  },
  watch: {
    isOpen: {
      handler() {
        this.dialogVisible = this.isOpen;
      },
    },
    dataBoard: {
      handler() {
        this.dataBoardRender = this.dataBoard;
      },
    },
  },
  computed: {
    columnOptions() {
      return { group: "columns", pull: true };
    },
    columnOptionsDisable() {
      return { group: "columns", pull: false, put: false };
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.$emit("reloadList");
    },
    handleOpenDetailCv(cv) {
      this.selectedCv = cv;
      this.$refs.detailCvModal.open();
    },
    calculatePer(count) {
      return ((count / this.kanBanProgress.length) * 100).toFixed(2);
    },
    handleClose() {
      this.$emit("close");
    },
    async onEndDrag(event) {
      let fromColum, toColumn;
      if (event.from) {
        fromColum = event.from.getAttribute("data-column");
        toColumn = event.to.getAttribute("data-column");
      }
      if (fromColum !== toColumn) {
        const { job_id } = event.item._underlying_vm_;
        if (toColumn === "0") {
          const payload = {
            cv_id: event.item._underlying_vm_.cv_id,
            id: job_id,
          };
          await hrJob.rejectCv(payload).then(() => this.$emit("reloadList"));
        } else {
          const payload = {
            cv_id: event.item._underlying_vm_.cv_id,
            hiring_process_round_id: Number(toColumn),
          };
          await hrJob
            .changeRound(job_id, payload)
            .then(() => this.$emit("reloadList"));
        }
      }
    },
    onStartDrag(event) {
      console.log(event);
      const draggedItemIndex = event.from.getAttribute("data-column");
      console.log(draggedItemIndex);
      if (draggedItemIndex === 0 || draggedItemIndex === "0") {
        event.preventDefault();
      }
    },
    async rejectCv(payload) {
      await hrJob.rejectCv(payload).then(() => this.$emit("reloadList"));
    },
    handleOpenRejectConfirm(payload) {
      console.log("Handle", payload);
      this.visible = true;
      this.rejectCvData = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
.round-list {
  display: flex;
  width: 100%;
}

.round-item {
  width: 25%;
}
.column {
  width: 250px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
}
.column-list {
  display: flex;
}
.cv-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  margin: 0 10px;
  padding: 10px;
}
.el-drawer__body {
  background: #f8fafc !important;
}
.el-tabs__content {
  padding-bottom: 30px !important;
}
.el-button--primary {
  background: #409eff !important;
}
.label {
  &__success {
    color: rgb(0, 226, 0);
  }
  &__danger {
    color: red;
  }
}
</style>
