<template>
  <el-dialog title="Detail Profile" :visible.sync="isOpen" width="50%">
    <div>
      <img
        v-if="avatar !== ''"
        class="w-40 h-40 rounded-full mx-auto object-cover"
        :src="avatar"
        :alt="cv.name"
      />
      <img
        v-else
        class="w-40 h-40 rounded-full mx-auto object-cover"
        src="../../assets/images/default-avatar.jpg"
        :alt="cv.name"
      />
      <!-- <img v-if="avatar !== ''" :src="avatar" alt="avatar">
      <img v-else src="../../assets/images/default-avatar.jpg" alt="avatar"> -->
      <div class="grid grid-cols-2 gap-3 mt-3">
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Name:</p>
          <span class="ml-2">{{ cv.name }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Email:</p>
          <span class="ml-2">{{ cv.email }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Age:</p>
          <span class="ml-2">{{ cv.age }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Address:</p>
          <span class="ml-2">{{ cv.address }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Position:</p>
          <span class="ml-2">{{ cv.position }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Education:</p>
          <span class="ml-2">{{ cv.education }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Phone:</p>
          <span class="ml-2">{{ cv.phone }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">GPA:</p>
          <span class="ml-2">{{ cv.gpa }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">English level:</p>
          <span class="ml-2">{{ cv.english }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Gender:</p>
          <span class="ml-2">{{ cv.gender_id === 1 ? "Male" : "Female" }}</span>
        </div>
        <div v-if="cv.get_skills" class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold cv__label">Skills:</p>
          <div class="skills">
            <div v-for="item in cv.get_skills" class="skills__item">
              {{ getSkillName(item.id) }}
            </div>
          </div>
        </div>
      </div>
      <el-button
        v-if="cv.cv_files_link !== ''"
        type="info"
        class="mt-2"
        @click="viewCV"
      >
        CV
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import useSkill from '../../composables/useSkill';

export default {
  name: "DetailCv",

  props: {
    cv: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    const {
      skills,
      fetchSkills,
    } = useSkill();

    fetchSkills();

    return {
      skills,
      fetchSkills,
    };
  },

  computed: {
    avatar() {
      if (this.cv.avatar) {
        return 'http://localhost:8000' + this.cv.avatar;
      } else {
        return '';
      }
    }
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    open() {
      this.isOpen = true;
    },

    getSkillName(id) {
      const skill = this.skills.find((el) => el.id === id);
      return skill?.name;
    },

    viewCV() {
      const cvUrl = 'http://localhost:8000' + this.cv.cv_files_link;
      window.open(cvUrl, '_blank');
    },
  },
};
</script>
<style lang="scss" scoped>
.skills {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  flex-wrap: wrap;
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
.cv__label {
  white-space: nowrap;
}
</style>
