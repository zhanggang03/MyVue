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
}
</script>
