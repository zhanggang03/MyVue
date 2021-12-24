<template>
  <div>
    <Student name="张三" sex="女"/>
  </div>
</template>

<script>
  //引入组件
  import Student from './components/Student.vue';
  export default {
    name: 'App',
    //局部组测组件
    components:{Student},
  }
</script>