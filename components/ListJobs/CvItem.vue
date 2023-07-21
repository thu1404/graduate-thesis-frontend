<template>
  <div class="cv-item shadow-md">
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
    <div class="ml-2">
      <div>
        <p>Name:{{ item.cv.name }}</p>
        <p>Email: {{ item.cv.email }}</p>
      </div>
      <div class="flex items-center mt-2">
        <div class="mr-4">
          <el-popover
            placement="top"
            width="160"
            v-model="visible"
            v-if="!disableButton"
          >
            <p>Are you sure to delete this?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false"
                >cancel</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="handleRejectCv({ id: item.job_id, cv_id: item.cv_id })"
                >confirm</el-button
              >
            </div>
            <el-button slot="reference">Loai</el-button>
          </el-popover>
        </div>
        <el-select
          v-if="!disableButton"
          v-model="item.round.id"
          placeholder="Select"
          @change="handleChangeRound"
          clear="ml-4"
        >
          <el-option
            v-for="item in hiringProgressRound"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import hrJob from "../../api/hrJob";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    hiringProgressRound: {
      type: Array,
      default: () => [],
    },
    disableButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleRejectCv(payload) {
      console.log({ payload });
      this.visible = false;
      this.$emit("rejectCv", payload);
    },
    async handleChangeRound(event) {
      console.log(event);
      const payload = {
        cv_id: this.item.cv_id,
        hiring_process_round_id: event,
      };
      await hrJob
        .changeRound(this.item.job_id, payload)
        .then(() => this.$emit("reloadList"));
    },
  },
};
</script>
