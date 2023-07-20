<template>
  <div class="list__container">
    <div v-for="(job, index) in jobs" :key="index" class="list__item">
      <JobCard
        :job="job"
        @apply="openApplyJob(job.id)"
        @edit="handleOpenEdit(job)"
        @openKanban="openDrawer(job.id)"
        @reloadList="reloadList"
      />
    </div>
    <el-button v-if="$auth.user?.role_id === 1" @click="openCreateJob"
      >Add new Job</el-button
    >
    <CreateJob ref="createJobModal" @submit="$emit('reloadList')" />
    <UpdateJob ref="updateJobModal" @submit="$emit('reloadList')" />
    <KanbanJob ref="kanbanJobDrawer" />
    <ApplyJob ref="applyJobDrawer" @apply="$emit('applyJob')" />
    <jobBoard
      :isOpen="isOpen"
      :hiringProgressRound="hiringProgressRound"
      :listRender="listRender"
      :kanBanProgress="kanBanProgress"
      @close="handleClose"
      @reloadList="getKanbanProgress"
      :dataBoard="dataBoard"
    />
  </div>
</template>
<script>
import JobCard from "./JobCard.vue";
// import userCandidate from '~/composables/useCandidate';
import Kanban from "@/components/kanban.vue";
import kanBanApi from "~/api/hrKanban";
import CreateJob from "../Job/CreateJob.vue";
import UpdateJob from "../Job/UpdateJob.vue";
import KanbanJob from "../Job/KanbanJob.vue";
import ApplyJob from "../Job/ApplyJob.vue";
import JobBoard from "./JobBoard.vue";

export default {
  name: "ListJobs",

  components: {
    JobCard,
    CreateJob,
    UpdateJob,
    KanbanJob,
    ApplyJob,
    Kanban,
    JobBoard,
  },
  data() {
    return {
      kanBanProgress: [],
      hiringProgressRound: [],
      list: [],
      isOpen: false,
      idSelected: null,
    };
  },
  props: {
    jobs: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    idSelected: {
      handler() {
        console.log({ idSelected: this.idSelected });
        this.kanBanProgress = [];
        this.hiringProgressRound = [];
        this.getKanbanProgress();
      },
    },
  },
  computed: {
    listRender() {
      const data = [];
      this.hiringProgressRound.forEach((round) => {
        const list = {
          resolve: [],
          reject: [],
        };
        list.resolve = this.kanBanProgress.filter(
          (item) =>
            item.round_id > round.id ||
            (item.round_id === round.id && item.status !== 0)
        );
        list.reject = this.kanBanProgress.filter(
          (item) => item.round_id === round.id && item.status === 0
        );
        data.push(list);
      });
      return data;
    },
    dataBoard() {
      console.log(this.kanBanProgress);
      const data = [];
      this.hiringProgressRound.forEach((round) => {
        console.log(round);
        const item = {
          name: round.name,
          id: round.id,
          items: [],
        };
        item.items = this.kanBanProgress.filter(
          (item) => item.round_id === round.id && item.status !== 0
        );
        data.push(item);
      });
      console.log(data);
      data.push({
        name: "Reject",
        id: 0,
        items: this.kanBanProgress.filter((item) => item.status === 0),
      });
      return data;
    },
  },
  methods: {
    reloadList() {
      this.$emit("reloadList");
    },
    openApplyJob(id) {
      if (this.$auth.user?.role_id === 2) {
        this.$refs.applyJobDrawer.open(id);
      }
    },
    openCreateJob() {
      if (this.$auth.user?.role_id === 1) {
        this.$refs.createJobModal.open();
      }
    },
    handleOpenEdit(job) {
      if (this.$auth.user?.role_id === 1) {
        this.$refs.updateJobModal.open(job);
      }
    },
    handleOpenKanban(jobId) {
      if (this.$auth.user?.role_id === 1) {
        this.$refs.kanbanJobDrawer.open(jobId);
      }
    },
    async getKanbanProgress() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const response = await kanBanApi.getKanban(this.idSelected);

      this.kanBanProgress = response.data.kanbanBoard;
      this.hiringProgressRound =
        response.data.hiringProcess[0].hiring_process_round;
      loading.close();
    },
    openDrawer(id) {
      this.isOpen = true;
      this.idSelected = id;
    },
    handleClose() {
      this.isOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__item {
    max-width: 1200px;
    width: 100%;
  }
}
</style>
