//改文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes:[
        {
            name:'guanyu',
            'path':'/about',  //父级路由，必须带'/'
            component:About,
            meta:{title:'关于'}
        },{
            name:'zhuye',
            'path':'/home',
            component:Home,
            meta:{title:'主页'},
            children:[
                {
                    name:'xiaoxi',
                    path:'message',   //子级路由，不能带'/'
                    component:Message,
                    meta:{isAuth: true, title:'消息'},
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
                            },
                            meta:{isAuth: true, title:'详情'}
                        }
                    ]
                },{
                    name:'xinwen',
                    path:'news',
                    component:News,
                    meta:{isAuth: true, title:'新闻'},
                }
            ]
        }
    ]
})

//全局前置路由守卫----初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
    console.log("前置路由守卫",to,from);
    //if(to.name === "xiaoxi" || to.name === "xinwen"){
    if(to.meta.isAuth){//判断是否需要鉴权
        if(localStorage.getItem('aiguigu') === 'true'){  //权限控制的具体规则
            next()  //放行
        }else{
            alert("不允许访问")
            //next({name:'guanyu'})  //跳转
        }
    }else{
        next();  //放行
    }

})

//全局后置路由守卫----初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to,from,next)=>{
    console.log("后置路由守卫",to,from)
    if(to.meta.title){
        document.title = to.meta.title  //修改网页title
    }  
    else{
        document.title = 'vue_test'
    }
});


export default router;