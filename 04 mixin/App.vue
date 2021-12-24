<template>
  <div>
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
    components:{Student, School},
  }
</script>