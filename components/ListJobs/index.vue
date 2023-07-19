<template>
  <div class="list__container">
    <div v-for="(job, index) in jobs" :key="index" class="list__item">
      <JobCard
        :job="job"
        @apply="openApplyJob(job.id)"
        @edit="handleOpenEdit(job)"
        @openKanban="openDrawer(job.id)"
      />
    </div>
    <el-button v-if="$auth.user?.role_id === 1" @click="openCreateJob"
      >Add new Job</el-button
    >
    <CreateJob ref="createJobModal" @submit="$emit('reloadList')" />
    <UpdateJob ref="updateJobModal" @submit="$emit('reloadList')" />
    <KanbanJob ref="kanbanJobDrawer" />
    <ApplyJob ref="applyJobDrawer" @apply="$emit('applyJob')" />
    <el-drawer
      title="Job kanbans board"
      :visible.sync="isOpen"
      direction="btt"
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
                    }}({{
                      caculatePer(listRender[index].resolve.length)
                    }})</span
                  >
                  <span
                    >Reject: {{ listRender[index].reject.length }}/{{
                      kanBanProgress.length
                    }}({{ caculatePer(listRender[index].reject.length) }})</span
                  >
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="kanban">Config</el-tab-pane>
      </el-tabs>
    </el-drawer>
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

export default {
  name: "ListJobs",

  components: {
    JobCard,
    CreateJob,
    UpdateJob,
    KanbanJob,
    ApplyJob,
    Kanban,
  },
  data() {
    return {
      kanBanProgress: [],
      hiringProgressRound: [],
      list: [],
      isOpen: false,
      activeName: "analytic",
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
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    caculatePer(count) {
      return ((count / this.kanBanProgress.length) * 100).toFixed(2);
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
      const response = await kanBanApi.getKanban(this.idSelected);
      this.kanBanProgress = response.data.kanbanBoard;
      this.hiringProgressRound =
        response.data.hiringProcess[0].hiring_process_round;
    },
    openDrawer(id) {
      console.log(id);
      this.isOpen = true;
      this.idSelected = id;
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
.round-list {
  display: flex;
  width: 100%;
}
.round-item {
  width: 25%;
}
</style>
