<template>
  <div class="mx-auto">
    <Header class="mb-8" />
    <div class="flex items-center justify-end mr-4">
      <el-button
        @click="openDialogAdd"
        type="primary"
      >
        New hiring process
      </el-button>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden flex flex-col items-center w-full">
            <div
              v-for="(round, index) in listHiringProgress"
              :key="index"
              class="round-item"
            >
              <div class="round-item__name">
                {{ round.name }}
              </div>
              <div class="round-item__action">
                <el-button
                  type="primary"
                  :disabled="usedProcess(round.id)"
                  @click="openDialogEdit(round.id)"
                >
                  Edit
                </el-button>
                <el-button
                  type="danger"
                  :disabled="usedProcess(round.id)"
                  @click="deleteProcess(round.id)"
                >
                  Delete
                </el-button>
                <el-button
                  @click="openDialogDetail(round.id)"
                  type="success"
                >
                  Detail
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DetailProcess
      ref="DetailProcessModal"
      :process-detail="processDetail"
      @closed="handleClose"
    />

    <CreateProcess
      ref="CreateProcessModal"
      @addProcess="getListProcess"
    />
    <EditProcess
      ref="EditProcessModal"
      :process="processDetail"
      @editProcess="getListProcess"
    />


  </div>
</template>
<script>
import hiringProcess from "@/api/hiringProcess";
import useJob from '../../composables/useJob';
import Header from "../../components/Header.vue";
import DetailProcess from "../../components/HiringProcess/DetailProcess.vue";
import CreateProcess from "../../components/HiringProcess/CreateProcess.vue";
import EditProcess from "../../components/HiringProcess/EditProcess.vue";

export default {
  name: "HRProcess",

  components: {
    Header,
    DetailProcess,
    CreateProcess,
    EditProcess,
  },

  setup() {
    const {
      hrJobs,
      fetchHrJobs,
    } = useJob();

    fetchHrJobs();

    return {
      hrJobs,
      fetchHrJobs,
    };
  },

  data() {
    return {
      listHiringProgress: [],
      // idSelected: null,
      processDetail: {},
      nameProgress: "",
      visible: false,
    };
  },

  // watch: {
  //   idSelected: {
  //     handler() {
  //       if (this.idSelected) {
  //         this.getDetailProcess();
  //       }
  //     },
  //   },
  // },



  methods: {
    isEmptyRound() {
      let index = -1;
      this.listRoundAddProgress.forEach((item) => {
        if (item.name.trim() === "") {
          console.log(item);
          index = 1;
        }
      });
      return index;
    },
    async getListProcess() {
      try {
        const response = await hiringProcess.getListProcess();
        console.log(response);
        this.listHiringProgress = response.data.hiring_process;
      } catch (e) {
        console.log(e);
      }
    },
    async getDetailProcess(id) {
      try {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const response = await hiringProcess.getDetailProcess(id);
        this.processDetail = response.data.hiring_process;
        // this.$refs.DetailProcessModal.open();
        loading.close();
      } catch (e) {
        console.log(e);
      }
    },
    openDialogDetail(id) {
      // this.idSelected = id;
      this.getDetailProcess(id);
      this.$refs.DetailProcessModal.open();
    },
    openDialogAdd() {
      this.$refs.CreateProcessModal.open();
    },
    async openDialogEdit(id) {
      // this.idSelected = id;
      await this.getDetailProcess(id);
      this.$refs.EditProcessModal.open();
    },
    handleClose() {
      this.processDetail = {};
      this.idSelected = null;
    },
    async deleteProcess(id) {
      try {
        const response = await hiringProcess.deleteProcess(id);
        this.getListProcess();
      } catch (e) {
        console.log(e);
      }
    },
    usedProcess(processID) {
      return this.hrJobs.some(job => job.hiring_process.id === processID);
    },
  },

  mounted() {
    this.getListProcess();
  },
};
</script>
<style lang="scss" scoped>
.button-more {
  margin-left: 20px;
}

.round-item {
  display: flex;
  height: 60px;
  width: 600px;
  margin-bottom: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  padding: 8px;
  display: flex;
  align-items: center;
  &__name {
    width: 300px;
    font-weight: 600;
  }
  &__action {
    display: flex;
  }
}
</style>
