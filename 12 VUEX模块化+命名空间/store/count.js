//求和相关的配置
export default {
    namespaced: true,    //VUEX模块化，必须配置namespaced为true
    actions:{
        jiaOdd(context, value){
            context.commit("JIA",value);
    
        },
        jiaWait(context, value){
            setTimeout(()=>{
                context.commit("JIA",value);
            },1000)
        },
    },
    mutations:{
        JIA(state, value){   //在模块化Store中，state参数只能得到本模块的state，并非全局的state
            state.sum += value;
        },
        JIAN(state, value){
            state.sum -= value;
        },
    },
    state:{    
        sum:0, //当前和
        school:'家',
        subject:'工作'
    },
    getters:{
        bigSum(state){
            return state.sum * 10
        }
    }
}