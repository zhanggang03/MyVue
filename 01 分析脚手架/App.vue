<template>
  <div>
    <img src="./assets/logo.png" alt="logo">
    <!--使用组件-->
    <School/>
    <Student/>
  </div>
</template>

<script>
  //引入组件
  import School from './components/School.vue';
  import Student from './components/Student.vue';
  export default {
    name: 'App',
    //局部组测组件
    components:{School,Student},
  }
</script>