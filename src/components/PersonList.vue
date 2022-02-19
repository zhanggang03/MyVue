<template>
    <div>
        <h1 style="color:red">上方组件的求和为{{sum}}</h1>
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入姓名" v-model="name"/>
        <button @click="add">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
import {nanoid} from 'nanoid'
import {mapState} from 'vuex'
export default {
    name:'PersonList',
    data() {
        return {
            name:'',
        }
    },
    computed:{
        ...mapState(['personList','sum']),
    },
    methods: {
        add(){
            const personObj = {id:nanoid(), name: this.name};
            this.$store.commit('ADD_PERSON',personObj);
        }
    },
    
}
</script>

<style>

</style>