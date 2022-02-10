//引入VUE
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)


//准备actions--用于相应组件中的动作
const actions = {
    /*jia(context, value){
        context.commit("JIA",value);
    },
    jian(context, value){
        context.commit("JIAN",value);
    },
    jiaOdd(context, value){
        if(context.state.sum % 2 === 1)
            context.commit("JIA",value);
    },*/
    jiaOdd(context, value){
        console.log('处理一些事情 -- jiaOdd')
        context.dispatch('demo1',value)

    },
    jiaWait(context, value){
        setTimeout(()=>{
            context.commit("JIA",value);
        },1000)
    },
    demo1(context,value){
        console.log('处理一些事情 -- demo1')
        context.dispatch('demo2',value)
    },
    demo2(context,value){
        console.log('处理一些事情 -- demo2')
        if(context.state.sum % 2 === 1)
            context.commit("JIA",value);
    }
}

//准备mutations --用于操作数据
const mutations = {
    JIA(state, value){
        state.sum += value;
    },
    JIAN(state, value){
        state.sum -= value;
    }
}

//准备state -- 用于存储数据
const state = {
    sum:0 //当前和
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})