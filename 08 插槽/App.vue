<template>
  <div>
    <DefaultIndex/>
    <NameIndex/>
    <ScopeIndex/>
  </div>
</template>

<script>
  import DefaultIndex from './components/defaultSlot/DefaultIndex.vue';
  import NameIndex from './components/nameSlot/NameIndex.vue';
  import ScopeIndex from './components/scopeSlot/ScopeIndex.vue'
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    methods:{
    },
    components:{
      DefaultIndex,NameIndex,ScopeIndex
    },
  }
</script>