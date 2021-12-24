<template>
  <div class="demo">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生年龄：{{address}}</h2>
    <button @click="showName">点我提示姓名</button>
  </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            name:'小学',
            address:'文化路'        
        }
    },
    methods:{
        showName(){
            alert(this.name);
        }
    }

}
</script>

<style>
    .demo{
        background-color: bisque;
    }
</style>