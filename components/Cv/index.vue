<template>
  <el-dialog title="Chi tiết Profile" :visible.sync="isOpen" width="50%">
    <div>
      <img
        class="w-40 h-40 rounded-full mx-auto"
        src="https://tse2.mm.bing.net/th?id=OIP.5IDB1hujccOFdQPWbWU9XAHaE8&pid=Api&P=0&h=180"
        alt=""
      />
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
          <p class="text-lg font-bold">Adreess:</p>
          <span class="ml-2">{{ cv.address }}</span>
        </div>
        <div class="col-span-1 shadow-md rounded-md flex p-4 items-center">
          <p class="text-lg font-bold">Position:</p>
          <span class="ml-2">{{ cv.positon }}</span>
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
          <p class="text-lg font-bold">Gener:</p>
          <span class="ml-2">{{ cv.gender_id === 1 ? "Name" : "Nữ" }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "DetailCv",

  props: {
    cv: {
      type: Object,
      default: () => {},
    },
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
  },
};
</script>
<style lang="scss"></style>
