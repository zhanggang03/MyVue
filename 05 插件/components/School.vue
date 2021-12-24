<template>
  <div>
    <h2>学校姓名：{{name | mySlice}}</h2>
    <h2>学生地址：{{address}}</h2>
    <button @click=showInfo>显示信息</button>
  </div>
</template>

<script>

export default {
    name: 'School',
    data() {
        return {
            name: 'XXX汝河路小学',
            address: '人民路',
        }
    },
    methods:{
        showInfo(){
            this.hello();
        }
    }
}
</script>

<style>
</style>