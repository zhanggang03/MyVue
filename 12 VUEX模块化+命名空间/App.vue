<template>
  <div>
    <Count></Count>
    <hr/>
    <PersonList/>
  </div>
</template>

<script>
  import Count from './components/Count';
  import PersonList from './components/PersonList.vue'
  export default {
    name: 'App',
    components:{Count,
    PersonList,
    },
  }
</script>

<style>
    
</style>