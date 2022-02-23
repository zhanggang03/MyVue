<template>
    <div>
        <ul>
            <li v-for="m in messageList" :key="m.id">
                <!-- 跳转路由并携带query参数，to 的字符串写法 -->
                <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link> -->

                <!-- 跳转路由并携带query参数，to 的对象写法 - -->
                <router-link :to="{
                    path : '/home/message/detail',
                    query: {
                        id:m.id,
                        title:m.title
                    }
                    }">{{m.title}}</router-link>

                <!-- 通过命名路由，简化写法 - -->
                <!--<router-link :to="{
                    name : 'xaingqing',
                    query: {
                        id:m.id,
                        title:m.title
                    }
                    }">{{m.title}}</router-link> -->

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
}
</script>