<template>
    <h2>这个是About页面</h2>
</template>

<script>
export default {
    name:'About',
    data() {
        return {
            
        }
    },
    beforeDestroy() {
        console.log('About组件即将销毁')
    },
    mounted() {
        console.log('About组件挂载完毕',this)
    },
    //通过路由规则，进入该组件时被调用
    beforeRouteEnter (to, from, next) {
        console.log('About---beforeRouteEnter',to,from)
        if(to.meta.isAuth){//判断是否需要鉴权
            if(localStorage.getItem('aiguigu') === 'true'){  //权限控制的具体规则
                next()  //放行
            }else{
                alert("不允许访问")
                //next({name:'guanyu'})  //跳转
            }
        }else{
            next()  //放行
        }  
    },
    //通过路由规则，离开该组件时被调用
    beforeRouteLeave (to, from, next) {
        console.log('About---beforeRouteLeave',to,from)
        next()

    }
}
</script>
