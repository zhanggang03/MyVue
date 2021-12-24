<template>
  <div>
    <h2>学校姓名：{{name}}</h2>
    <h2>学生地址：{{address}}</h2>
    <button @click="showName">显示名字</button>
  </div>
</template>

<script>
//引入混合
import {hunhe1,hunhe2} from '../mixin'

export default {
    name: 'School',
    data() {
        return {
            name: 'XXX小学',
            address: '人民路',
            x: 999 
        }
    },
    methods:{
        showName(){
            alert('优先')
        }
    },
    mounted(){
        console.log("加载学校")
    },
    //配置混合
    mixins:[hunhe1,hunhe2]
}
</script>

<style>
</style>