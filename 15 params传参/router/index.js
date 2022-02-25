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
                            path:'detail/:id/:title',   //使用占位符声明params参数
                            component:Detail
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