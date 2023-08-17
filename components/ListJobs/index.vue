<template>
  <div class="main">
    <div v-if="$route.path === '/'" class="search-container">
      Keywords:
      <el-input v-model="search.keyword" clearable class="mb-4"/>
      salary:
      <el-input v-model="search.salary" clearable class="mb-4"/>
      Skill:
      <el-select v-model="search.skills" clearable filterable multiple class="flex mb-4">
        <el-option
            v-for="item in skills"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
      </el-select>

      filter:
      <el-select v-model="search.filter" clearable class="flex mb-4">
        <el-option
            v-for="item in filter"
            :key="item.index"
            :label="item.name"
            :value="item.index"
          />
      </el-select>

      <el-button type="primary" class="mt-4" @click="searched">Search</el-button>
    </div>
    <div class="list__container">
      <el-button
        v-if="$auth.user?.role_id === 1 && $route.path !== '/'"
        type="primary"
        @click="openCreateJob"
        class="self-end"
      >
        Add new Job
      </el-button>
      <div v-for="(job, index) in jobs" :key="index" class="list__item">
        <JobCard
          :job="job"
          :skills="skills"
          @apply="openApplyJob(job.id)"
          @edit="handleOpenEdit(job)"
          @openKanban="openDrawer(job.id)"
          @reloadList="reloadList"
        />
      </div>
      
      <CreateJob ref="createJobModal" @submit="$emit('reloadList')" />
      <UpdateJob ref="updateJobModal" @submit="$emit('reloadList')" />
      <!-- <KanbanJob ref="kanbanJobDrawer" /> -->
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
// import skillsApi from "../../api/skills";

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

  props: {
    jobs: {
      type: Array,
      default: () => [],
    },

    skills: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      kanBanProgress: [],
      hiringProgressRound: [],
      list: [],
      isOpen: false,
      idSelected: null,
      search: {
        keyword: '',
        skills: [],
        salary: '',
        filter: null,
      },
      filter: [
        {
          index: 1,
          name: 'Newest',
        },
        {
          index: 2,
          name: 'Oldest',
        },
        {
          index: 3,
          name: 'A-Z',
        },
        {
          index: 4,
          name: 'Z-A',
        },
      ]
    };
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
      // console.log(this.kanBanProgress);
      const data = [];
      this.hiringProgressRound.forEach((round) => {
        // console.log(round);
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
      // console.log(data);
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
      if (!this.$auth.loggedIn) {
        this.$router.push('/login');
      } else if (this.$auth.user?.role_id === 2) {
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
    searched() {
      this.$emit('search', this.search);
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
.main {
  display: flex;
  gap: 32px;
  padding: 32px;
  .search-container {
    height: 400px;
    width: 360px;
    border: 1px solid #d8d8d8;
    border-radius: 8px;
    padding: 12px;
  }
  .list {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;
    }

    &__item {
      max-width: 1200px;
      width: 100%;
    }
  }
}

</style>
