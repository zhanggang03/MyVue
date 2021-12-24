<template>
    <div class="container">
        <Category title="美食">
            <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg"/>
            <a slot="footer" href="http://www.atguigu.com">更多美食</a>
        </Category>

        <Category title="游戏">
            <ul slot="center">
                <li v-for="(g,index) in games" :key="index">{{g}}</li>
            </ul>
            <div class="foot" slot="footer">
                <a href="http://www.atguigu.com">单机游戏</a>
				<a href="http://www.atguigu.com">网络游戏</a>
            </div>
        </Category>

        <Category title="电影">
            <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
            <div class="foot" slot="footer">
                <a href="http://www.atguigu.com">经典</a>
				<a href="http://www.atguigu.com">热门</a>
				<a href="http://www.atguigu.com">推荐</a>
            </div>
        </Category>

        <Category title="其他">
        </Category>
    </div>


</template>

<script>
import Category from './Category.vue'
export default {
    name:'NameIndex',
    components:{Category},
    data() {
        return {
            games:['植物大战僵尸','红色警戒','空洞骑士','王国']
        }
    },
}
</script>

<style>
	.container,.foot{
		display: flex;
		justify-content: space-around;
	}
	h4{
		text-align: center;
	}
</style>