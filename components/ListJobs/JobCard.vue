<template>
  <div class="job-card">
    <div class="title" @click="openKanban(job.id)">{{ job.title }}</div>
    <div class="content">
      <div class="main__info">
        <div class="main__info--item">
          <div class="main__info--label">Description</div>
          <div class="main__info--content">
            {{ job.description }}
          </div>
        </div>
        <div class="main__info--item">
          <div class="main__info--label">Requirement</div>
          <div class="main__info--content">
            {{ job.requirements }}
          </div>
        </div>
        <div class="main__info--item">
          <div class="main__info--label">Benefit</div>
          <div class="main__info--content">
            {{ job.benefit }}
          </div>
        </div>
      </div>
      <div class="additional__info">
        <div class="additional__info--item">
          <div class="additional__info--label">Work location</div>
          <div class="additional__info--content">
            {{ job.location }}
          </div>
        </div>
        <div class="additional__info--item">
          <div class="additional__info--label">Salary</div>
          <div class="additional__info--content">
            {{ job.salary }}
          </div>
        </div>
      </div>
    </div>
    <div class="skills">
      <div v-for="item in job.skills" class="skills__item">
        {{ getSkillName(item.id) }}
      </div>
    </div>
    <el-button
      v-if="$auth.user?.role_id === 1 && $route.path !== '/'"
      @click="$emit('edit')"
    >
      Edit
    </el-button>
    <el-switch
      v-if="$auth.user?.role_id === 1 && $route.path !== '/'"
      @change="handleChangeStatus"
      v-model="status"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
    <el-button v-if="canApply" type="primary" @click="$emit('apply')">
      Apply
    </el-button>
  </div>
</template>
<script>
import hrJob from "@/api/hrJob";

export default {
  name: "JobCard",

  props: {
    job: {
      type: Object,
      default: () => {},
    },

    skills: {
      type: Array,
      default: [],
    }
  },

  data() {
    return {
      status: false,
    };
  },

  computed: {
    canApply() {
      return (this.job.get_cv?.length <= 0 && this.$auth.user?.role_id === 2) || !this.$auth?.loggedIn
    },
  },

  mounted() {
    this.status = !this.job.inactive;
  },

  methods: {
    openKanban(id) {
      if (this.$auth.user?.role_id === 1) {
        this.$emit("openKanban", id);
      }
    },
    async handleChangeStatus(event) {
      console.log(event);
      if (event) {
        hrJob
          .enableJob(this.job.id)
          .then(() => {
            this.$emit("reloadList");
            this.$notify({
              message: "Enable job successfully",
              type: "success",
            });
          })
          .catch(console.log);
      } else {
        hrJob
          .disableJob(this.job.id)
          .then(() => {
            this.$emit("reloadList");
            this.$notify({
              message: "Disable job successfully",
              type: "success",
            });
          })
          .catch(console.log);
      }
    },
    getSkillName(id) {
      const skill = this.skills.find((el) => el.id === id);
      return skill?.name;
    }
  },
};
</script>
<style lang="scss" scoped>
.job-card {
  margin: 16px 32px;
  padding: 16px;
  width: 100%;
  // border: 1px solid #000;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  .title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 12px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .main__info,
  .additional__info {
    &--item {
      margin-bottom: 8px;
    }
    &--label {
      font-weight: 600;
    }
  }
  .skills {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 12px;
    &__item {
      background-color: #d3d3d3;
      border-radius: 12px;
      height: 24px;
      font-size: 16px;
      line-height: 20px;
      padding: 4px 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.content {
  display: flex;
  justify-content: space-between;
}
</style>
