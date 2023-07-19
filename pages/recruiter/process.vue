<template>
  <div>
    <h1>Danh sách Hiring Progress</h1>
    <div v-if="listHiringProgress.length">
     <div>
       <div v-for="(progress, index) in listHiringProgress" :key="index">
         <span> {{progress.name}}</span>
         <span class="button-more" @click="openDialogDetail(progress.id)">Xem chi tiết</span>
       </div>
     </div>
      <button @click="openDialogAdd">Thêm Progress</button>
    </div>
    <el-dialog
      :title="titleDialog"
      :visible.sync="isDialogDetail"
      width="50%"
      :before-close="handleClose">
      <div>
        <h1>{{progressDetail.name}}</h1>
        <div>
          <div v-for="(round, index) in progressDetail.hiring_process_round" :key="index">
            <span>Round {{index+1}}: {{round.name}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="Thêm Progress"
      :visible.sync="isDialogAdd"
      width="50%"
      :before-close="handleCloseDialogAdd">
      <div>
        <input type="text" placeholder="Tên Progress" v-model="nameProgress">
      </div>
      <div>
        <div v-for="(round, index) in listRoundAddProgress" :key="index">
           <input v-model="round.name" placeholder="Tên round"/>
           <span @click="removeRound(index)">Xóa</span>
         </div>
        </div>
      <button @click="addRound">Thêm Vòng</button>
      <button @click="addHiringProgress">Thêm Progress</button>
    </el-dialog>
  </div>
</template>
<script>
import hiringProcess from "@/api/hiringProcess";

export default {
  name: 'HRProcess',
  data() {
    return {
      listHiringProgress: [],
      idSelected: null,
      progressDetail: {},
      isDialogDetail: false,
      isDialogAdd: false,
      listRoundAddProgress : [{name: ''}, {name: ''}],
      nameProgress: ''
    }
  },
  mounted() {
    this.getListProcess()
  },
  watch: {
    idSelected: {
      handler() {
        if(this.idSelected) {
          this.getDetailProcess()
        }
      }
    }
  },
  computed: {
    titleDialog() {
      return `Chi tiết Progress ${this.progressDetail.name}`
    },

  },
  methods: {
    isEmptyRound() {
      let index = -1
      this.listRoundAddProgress.forEach((item) => {
        if(item.name.trim() === "") {
          console.log(item)
          index = 1
        }
      })
      return index;
    },
    async getListProcess() {
      try {
        const response = await  hiringProcess.getListProcess()
        console.log(response)
        this.listHiringProgress = response.data.hiring_process
      }
      catch (e) {
        console.log(e)
      }
    },
    async getDetailProcess() {
      try {
        const response = await  hiringProcess.getDetailProcess(this.idSelected)
        this.progressDetail = response.data.hiring_process
        this.isDialogDetail = true
      }
      catch (e) {
        console.log(e)
      }
    },
    openDialogDetail(id) {
      this.idSelected = id
    },
    openDialogAdd() {
      this.isDialogAdd = true
    },
    handleClose() {
      this.isDialogDetail = false
      this.progressDetail = {}
    },
    handleCloseDialogAdd() {
      this.isDialogAdd = false
      this.listRoundAddProgress = [{name: ''}, {name: ''}]
    },
    addRound() {
      this.listRoundAddProgress.push({
        name: ''
      })
    },
    async addHiringProgress() {
      if(this.nameProgress.trim() === "") {
        this.$notify({
          title: "Name Progress không được để trống",
          type: 'error'
        })
        return
      }
      if(this.listRoundAddProgress.length < 2) {
        this.$notify({
          title: "Phải có ít nhất 2 round",
          type: 'error'
        })
        return
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
        hiring_process_round: this.listRoundAddProgress
      }
      hiringProcess.createProcess(payloads).then(() => {
        this.getListProcess()
        this.$notify({
          title: "Thêm Hiring Progress thành công",
          type: 'success'
        })
      })
        .catch((e) => {
          this.$notify({
            title: "Có lỗi xảy ra",
            type: 'error'
          })
        })
    },
    removeRound(index) {
       this.listRoundAddProgress.splice(index,1)
    }
  }
}
</script>
<style lang="scss">
.button-more {
  margin-left: 20px;
}
</style>
