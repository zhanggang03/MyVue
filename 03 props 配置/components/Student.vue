<template>
  <div class="demo">
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生年龄：{{age+1}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>修改后年龄：{{myAge}}</h2>
    <button @click="addAge">点我修改年龄</button>
  </div>
</template>

<script>
export default {
    name: 'Student',

    ////简化写法
    //props:['name','sex','age'],
    
    /*//接收的同时对数据进行类型限制
    props:{
        name:String,
        sex:String,
        age:Number
    }, */

    //接收的同时，对数据类型+—必要性+默认值的指定进行限制
    props:{
        name:{
            type:String, //name的类型是字符串
            required: true,  //name是必要的
        },
        sex:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            default:99   //默认值
        }
    },

    data() {
        return {
            msg:'我是一个小学生',
            myAge: this.age        
        }
    },
    methods:{
        addAge(){
            this.myAge = this.myAge + 1;
        }
    }

}
</script>

<style>
    .demo{
        background-color: bisque;
    }
</style>