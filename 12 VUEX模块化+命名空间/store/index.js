//引入VUE
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

import count from './count'
import personList from './personList'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        countOptions: count,
        personOptions: personList
    }
})