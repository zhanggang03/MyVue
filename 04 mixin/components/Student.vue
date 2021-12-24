<template>
  <div class="demo">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生年龄：{{age}}</h2>
    <button @click="showName">显示名字</button>
  </div>
</template>

<script>
import {hunhe1,hunhe2} from '../mixin'

export default {
    name: 'Student',
    data() {
        return {
            name:'张三',
            age: 18   
        }
    },
    mixins:[hunhe1,hunhe2]

}
</script>

<style>
    .demo{
        background-color: bisque;
    }
</style>