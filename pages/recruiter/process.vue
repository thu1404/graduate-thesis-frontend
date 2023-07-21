<template>
  <div class="mt-10 mx-auto">
    <div class="flex items-center justify-end mr-4">
      <button
        @click="openDialogAdd"
        class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
      >
        Thêm Progress
      </button>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">#</th>
                  <th scope="col" class="px-6 py-4">Name</th>
                  <th scope="col" class="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b dark:border-neutral-500"
                  v-for="(round, index) in listHiringProgress"
                  :key="index"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                    {{ index }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                    {{ round.name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <button
                      class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                    >
                      Edit
                    </button>
                    <button
                      class="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                    >
                      Delete
                    </button>
                    <button
                      @click="openDialogDetail(round.id)"
                      class="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="titleDialog"
      :visible.sync="isDialogDetail"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <h1 class="text-2xl font-bold mb-8">
          Tên Progres:
          <span class="font-bold text-pink-500">{{ progressDetail.name }}</span>
        </h1>
        <div class="grid grid-cols-2 gap-5">
          <div
            class="col-span-2 bg-white shadow-md text-center py-2 rounded-lg text-lg"
            v-for="(round, index) in progressDetail.hiring_process_round"
            :key="index"
          >
            <span>Round {{ index + 1 }}: {{ round.name }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="Thêm Progress"
      :visible.sync="isDialogAdd"
      width="50%"
      :before-close="handleCloseDialogAdd"
    >
      <div>
        <div class="full mb-10">
          <div class="relative h-14 w-full min-w-[200px]">
            <input
              v-model="nameProgress"
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label
              class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Tên Progress
            </label>
          </div>
        </div>
      </div>
      <div>
        <div v-for="(round, index) in listRoundAddProgress" :key="index">
          <div class="full flex mb-4 itemscenter">
            <div class="relative h-14 w-full min-w-[200px]">
              <input
                v-model="round.name"
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label
                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Tên round
              </label>
            </div>
            <span
              class="block w-[50px] ml-2 font-bold cursor-pointer"
              @click="removeRound(index)"
              >Xóa</span
            >
          </div>
        </div>
      </div>
      <button
        @click="addRound"
        class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
      >
        Thêm Vòng
      </button>
      <button
        @click="addHiringProgress"
        class="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
      >
        Thêm Progress
      </button>
    </el-dialog>
  </div>
</template>
<script>
import hiringProcess from "@/api/hiringProcess";

export default {
  name: "HRProcess",
  data() {
    return {
      listHiringProgress: [],
      idSelected: null,
      progressDetail: {},
      isDialogDetail: false,
      isDialogAdd: false,
      listRoundAddProgress: [{ name: "" }, { name: "" }],
      nameProgress: "",
    };
  },
  mounted() {
    this.getListProcess();
  },
  watch: {
    idSelected: {
      handler() {
        if (this.idSelected) {
          this.getDetailProcess();
        }
      },
    },
  },
  computed: {
    titleDialog() {
      return `Chi tiết Progress ${this.progressDetail.name}`;
    },
  },
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
    async getDetailProcess() {
      try {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const response = await hiringProcess.getDetailProcess(this.idSelected);
        this.progressDetail = response.data.hiring_process;
        this.isDialogDetail = true;
        loading.close();
      } catch (e) {
        console.log(e);
      }
    },
    openDialogDetail(id) {
      this.idSelected = id;
    },
    openDialogAdd() {
      this.isDialogAdd = true;
    },
    handleClose() {
      this.isDialogDetail = false;
      this.progressDetail = {};
      this.idSelected = null;
    },
    handleCloseDialogAdd() {
      this.isDialogAdd = false;
      this.listRoundAddProgress = [{ name: "" }, { name: "" }];
    },
    addRound() {
      this.listRoundAddProgress.push({
        name: "",
      });
    },
    async addHiringProgress() {
      if (this.nameProgress.trim() === "") {
        this.$notify({
          title: "Name Progress không được để trống",
          type: "error",
        });
        return;
      }
      if (this.listRoundAddProgress.length < 2) {
        this.$notify({
          title: "Phải có ít nhất 2 round",
          type: "error",
        });
        return;
      }
      // if(this.isEmptyRound()) {
      //   this.$notify({
      //     title: "Các round không được để trống",
      //     type: 'error'
      //   })
      //   return
      // }
      const payloads = {
        name: this.nameProgress,
        hiring_process_round: this.listRoundAddProgress,
      };
      hiringProcess
        .createProcess(payloads)
        .then(() => {
          this.getListProcess();
          this.$notify({
            title: "Thêm Hiring Progress thành công",
            type: "success",
          });
        })
        .catch((e) => {
          this.$notify({
            title: "Có lỗi xảy ra",
            type: "error",
          });
        });
    },
    removeRound(index) {
      this.listRoundAddProgress.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.button-more {
  margin-left: 20px;
}
</style>
