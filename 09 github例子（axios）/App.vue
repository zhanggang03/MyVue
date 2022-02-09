<template>
  <div>
    <button @click="getStudent">获取学生信息</button>
    {{studentInfo}}
    <br/>
    <button @click="getCar">获取汽车信息</button>
    {{carInfo}}


    <div class="container">
      <Search />
      <List />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Search from './components/Search.vue';
  import List from './components/List.vue';
  export default {
    name: 'App',
    data() {
      return {
        studentInfo: '',
        carInfo: ''
      }
    },
    methods:{
      getStudent(){
        axios.get('/StudentAction/weblifecyc/Student/getStudentInfo/aaa').then(
          response => {
            this.studentInfo = response.data;
            console.log('请求Student成功了', response.data)
          },
          error => {
            this.studentInfo = error.message;
            console.log('请求Student失败了', error.message)
          }
        )
      },
      getCar(){
        axios.get('/CarAction/weblifecyc/Car/getCarInfo/aaa').then(
          response => {
            this.carInfo = response.data;
            console.log('请求Car成功了', response.data)
          },
          error => {
            this.carInfo = error.message;
            console.log('请求Car失败了', error.message)
          }
        )
      }
    },
    components:{
      Search, List
    },
  }
</script>

<style>
    
</style>