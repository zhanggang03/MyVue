<template>
    <ul>
        <li :style="{opacity}"></li>
        <li>news001 <input type="text"/></li>
        <li>news002 <input type="text"/></li>
        <li>news003 <input type="text"/></li>
    </ul>
</template>

<script>
export default {
    name:'News',
    data() {
        return {
            opacity: 1
        }
    },
    beforeDestroy() {
        console.log('News组件即将销毁')
    },
    activated() {
        console.log('News组件激活')
        this.timer = setInterval(() => {
            console.log('@')
            this.opacity -= 0.01
            if(this.opacity <=0 ) this.opacity = 1
        }, 16);
    },
    deactivated() {
        console.log('News组件失活')
        console.log(this)
        clearInterval(this.timer)
    },
}
</script>
