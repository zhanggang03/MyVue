<template>
    <div>
        <ul>
            <li v-for="m in messageList" :key="m.id">
                <!-- 跳转路由并携带params参数，to 的字符串写法 -->
                <!--<router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>-->

                <!-- 跳转路由并携带params参数，to 的对象写法(必须使用name,不能使用path,配合布尔值props:true) - -->
                <!--<router-link :to="{
                    name : 'xaingqing',
                    params: {
                        id:m.id,
                        title:m.title
                    }
                    }">{{m.title}}</router-link>-->


                <!-- 跳转路由并携带query参数，to 的对象写法(配合函数props(){}) - -->
                <router-link :to="{
                    name : 'xaingqing',
                    query: {
                        id:m.id,
                        title:m.title
                    }
                    }">{{m.title}}</router-link>
                
                <button @click="pushShow(m)">push查看</button>
                <button @click="replaceShow(m)">replace查看</button>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'Message',
    data() {
        return {
            messageList:[
                {id:'1', title:'消息001'},
                {id:'2', title:'消息002'},
                {id:'3', title:'消息003'}
            ]
        }
    },
    methods: {
        pushShow(m){
            this.$router.push({
                name : 'xaingqing',
                    query: {
                        id:m.id,
                        title:m.title
                    }
            })

        },
        replaceShow(m){
            this.$router.replace({
                name : 'xaingqing',
                    query: {
                        id:m.id,
                        title:m.title
                    }
            })

        }
    },
    beforeDestroy() {
        console.log('Messages组件即将销毁')
    },
}
</script>