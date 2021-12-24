<template>
  <div>
    <img src="./assets/logo.png" alt="logo">
    <h1 v-text="msg" ref='title'></h1>
    <button @click="showDom" ref='btn'>点我显示Dom元素</button>
    <School ref='sch'/>
  </div>
</template>

<script>
  //引入组件
  import School from './components/School.vue';
  export default {
    name: 'App',
    //局部组测组件
    components:{School},
    data() {
      return {
        msg: '学习VUE'
      }
    },
    methods:{
      showDom(){
        console.log(this.$refs.title);  //真实的DOM元素
        console.log(this.$refs.btn);    //真实的DOM元素
        console.log(this.$refs.sch);    //VC实例(school组件的实例对象)
      }
    }
  }
</script>