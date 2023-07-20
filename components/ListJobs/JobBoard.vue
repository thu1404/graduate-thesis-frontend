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
      <el-tab-pane label="kanban">
        <div class="column-list">
          <div
            v-for="(board, index) in dataBoard"
            class="column"
            :data-column="board.id"
            :key="index"
            style="min-height: 100px; height: 100%"
          >
            <h3>{{ board.name }}</h3>
            <draggable
              :group="{ name: 'columns', pull: board.id !== 0 }"
              v-model="board.items"
              :data-column="board.id"
              @end="onEndDrag"
              @start="onStartDrag"
              style="min-height: 100px"
            >
              <div v-for="(item, index) in board.items" :key="index">
                <div class="cv-item">
                  <div>
                    <img
                      style="
                        width: 60px;
                        height: 60px;
                        border-radius: 100%;
                        margin-right: 10px;
                      "
                      src="https://tse2.mm.bing.net/th?id=OIP.O70iDYogu82D_8mBtMDP5QHaEK&pid=Api&P=0&h=180"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>Name:{{ item.cv.name }}</p>
                    <p>Email: {{ item.cv.email }}</p>
                    <button
                      @click="
                        rejectCv({
                          id: item.job_id,
                          cv_id: item.cv_id,
                        })
                      "
                    >
                      Loai
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
import draggable from "vuedraggable";
import hrJob from "../../api/hrJob";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      activeName: "analytic",
      dialogVisiable: false,
      dataBoardRedner: [],
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
    console.log({ dataBoard: this.dataBoard });
    this.dialogVisiable = this.isOpen;
    this.dataBoardRedner = this.dataBoard;
  },
  watch: {
    isOpen: {
      handler() {
        this.dialogVisiable = this.isOpen;
      },
    },
    dataBoard: {
      handler() {
        this.dataBoardRedner = this.dataBoard;
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
    caculatePer(count) {
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
  },
};
</script>

<style>
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
}
.column-list {
  display: flex;
}
.cv-item {
  display: flex;
  align-items: center;
  background: red;
  margin-bottom: 10px;
}
</style>
