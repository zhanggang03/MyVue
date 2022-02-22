
//人员管理相关的配置
import axios from 'axios'
import {nanoid} from 'nanoid'
export default {
    namespaced: true,
    actions:{
        addPersonWang(context, value){
            if(value.name.indexOf("王") === 0){
                context.commit('ADD_PERSON',value);
            }else{
                alert('必须添加一个姓王的人')
            }
        },
        addPersonServer(context){
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('ADD_PERSON',{
                        id:nanoid(),
                        name:response.data
                    })
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations:{
        ADD_PERSON(state,value){   //在模块化Store中，state参数只能得到本模块的state，并非全局的state
            state.personList.unshift(value)
        }
    },
    state:{
        personList:[
            {id:'1', name:'张三'},
            {id:'2', name:'李四'},
        ]
    },
    getters:{
        firstPeopleName(state){
            return state.personList[0].name;
        }
    }
}