<template>
    <div class="container">
        <Category title="美食">
            <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg">
        </Category>

        <Category title="游戏">
            <ul>
                <li v-for="(g,index) in games" :key="index">{{g}}</li>
            </ul>
        </Category>

        <Category title="电影">
            <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
        </Category>

        <Category title="其他">
        </Category>
    </div>
</template>

<script>
import Category from './Category.vue'
export default {
    name:'DefaultIndex',
    data() {
        return {
            games:['植物大战僵尸','红色警戒','空洞骑士','王国']
        }
    },
    components: { Category },
    methods: {
        
    },
    mounted() {
        
    },
    
}
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: space-around;
    }
</style>