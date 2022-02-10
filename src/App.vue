<template>
  <div>
    <Count></Count>
    <CountVuex/>
  </div>
</template>

<script>
  import Count from './components/Count';
  import CountVuex from './components/CountVuex.vue'
  export default {
    name: 'App',
    components:{Count,
    CountVuex
    },
  }
</script>

<style>
    
</style>