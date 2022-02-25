//改文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'

//创建router实例对象，去管理一组一组的路由规则
export default new VueRouter({
    routes:[
        {
            'path':'/about',  //父级路由，必须带'/'
            component:About
        },{
            'path':'/home',
            component:Home,
            children:[
                {
                    path:'message',   //子级路由，不能带'/'
                    component:Message,
                    children:[
                        {
                            name:'xaingqing',
                            //path:'detail/:id/:title',
                            path:'detail',
                            component:Detail,

                            //props的第一种写法，该对象中的所有key-value都会以props的形式传递给Detail组件
                            //props:{id: 1,title: 'hello'}

                            //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传递给Detail组件
                            //props:true

                            //props的第三那种写法，值为函数
                            props({query}){
                                return {id:query.id,title:query.title}
                            }
                        }
                    ]
                },{
                    path:'news',
                    component:News
                }
            ]
        }
    ]
})