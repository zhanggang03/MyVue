<template>
    <div class="col-xs-offset-2 col-xs-8">
		<div class="page-header"><h2>Vue Router Demo</h2></div>
        <button @click="forward">前进</button>
        <button @click="back">后退</button>
        <button @click="go">测试go</button>
	</div>
</template>

<script>
export default {
    name:'Baner',
    methods: {
        forward(){
            this.$router.forward();
        },
        back(){
            this.$router.back();
        },
        go(){
            this.$router.go(-2);
        }
    },
}
</script>

