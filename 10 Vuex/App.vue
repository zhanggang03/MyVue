<template>
  <div>
    <Count></Count>
    <CountVuex/>
    <CountVuexMapMethods/>
  </div>
</template>

<script>
  import Count from './components/Count';
  import CountVuex from './components/CountVuex.vue'
  import CountVuexMapMethods from './components/CountVuexMapMethods.vue'
  export default {
    name: 'App',
    components:{Count,
    CountVuex,
    CountVuexMapMethods,
    },
  }
</script>

<style>
    
</style>