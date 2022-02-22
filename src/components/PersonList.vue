<template>
    <div>
        <h1 style="color:red">上方组件的求和为{{sum}}</h1>
        <h1>列表中第一个人员的名字是：{{firstPeopleName}}</h1>
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入姓名" v-model="name"/>
        <button @click="add">添加</button>
        <button @click="addWang">添加姓王的人</button>
        <button @click="addPersonServer">添加一个人，名字随机</button>

        <ul>
            <li v-for="p in personList" :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'PersonList',
    data() {
        return {
            name:'',
        }
    },
    computed:{
        personList(){
            return this.$store.state.personOptions.personList     //能够解决不同VUEX模块命名形同的问题；
        },
        sum(){
            return this.$store.state.countOptions.sum
        },
        firstPeopleName(){
            return this.$store.getters["personOptions/firstPeopleName"]
        }
    },
    methods: {
        add(){
            const personObj = {id:nanoid(), name: this.name};
            this.$store.commit('personOptions/ADD_PERSON',personObj);
            this.name = ''
        },
        addWang(){
            const personObj = {id:nanoid(), name: this.name}
            this.$store.dispatch("personOptions/addPersonWang",personObj)
            this.name = ''
        },
        addPersonServer(){
            this.$store.dispatch("personOptions/addPersonServer")
            this.name = ''
        }
    },
    
}
</script>

<style>

</style>