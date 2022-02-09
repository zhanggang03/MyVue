<template>
    <div>
        <section class="jumbotron">
            <h3 class="jumbotron-heading"></h3>
            <div>
                <input type="text" placeholder="enter the name you search" v-model='keyWord'/> &nbsp;
                <button @click="getUsers()">Search</button>
            </div>
        </section>                
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Search',
    data(){
        return{
        keyWord:''
        }
    },
    methods:{
    getUsers(){
        //请求前清空List数据
        this.$bus.$emit('updateListData',{isLoading:true, errMsg:'', isFirst:false});
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
            reponse => {
                console.log('请求成功了');
                //请求成功后更新List数据
                this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',users:reponse.data.items})
            },
            error => {
                console.log('请求失败了');
                this.$bus.$emit('updateListData',{isLoading:false,errMsg:error.message,users:[]})
            }
        )
        }
    }
}
</script>

