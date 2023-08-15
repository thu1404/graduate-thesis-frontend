<template>
  <div class="cv-item shadow-md">
    <div>
      <img
        v-if="avatar !== ''"
        :src="avatar"
        :alt="item.cv.name"
        class="avatar"
      />
      <img
        v-else
        src="../../assets/images/default-avatar.jpg"
        :alt="item.cv.name"
        class="avatar"
      />
    </div>
    <div class="ml-2">
      <div>
        <p class="cv__name" @click="$emit('openCV')">Name: {{ item.cv.name }}</p>
        <p>Email: {{ item.cv.email }}</p>
      </div>
      <div class="flex items-center mt-2">
        <div class="mr-4">
          <el-popover
            placement="top"
            width="280"
            v-model="visible"
            v-if="!disableButton"
          >
            <p>Are you sure you want to reject this candidate?</p>
            <div style="text-align: center; margin: 0">
              <el-button size="mini" type="info" @click="visible = false">
                cancel
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleRejectCv({ id: item.job_id, cv_id: item.cv_id })"
              >
                confirm
              </el-button>
            </div>
            <el-button type="danger" slot="reference">Reject</el-button>
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
  name: 'CVItem',

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

  computed: {
    avatar() {
      if (this.item.cv.avatar) {
        return 'http://localhost:8000' + this.item.cv.avatar;
      } else {
        return '';
      }
    }
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
<style lang="scss" scoped>
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  margin-right: 10px;
  object-fit: cover;
}
.cv__name {
  font-weight: 600;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
