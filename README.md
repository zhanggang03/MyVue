## refs属性
   1、被用来给元素或者子组件注册引用信息（id的替代者）
   2、应用在html标签上获取真实的DOM元素，应用在组件标签上是组件实例对象（VC）
   3、引用方式 <h1 ref="xxxxx">...<h1>  <School ref="xxx"/>
      获取：this.$refs.xxx 

## props
    功能：让组件接收外部传过来的数据
    1、传递数据：
    <Demo name='XXXX'/>
    2、接收数据：
      1、数组接收
        props:['name','sex','age'],

      2、限制类型
        props:{
            name:String,
            sex:String,
            age:Number
        },

      3、限制类型、限制必要性、指定默认值
        props:{
            name:{
                type:String, //name的类型是字符串
                required: true,  //name是必要的
            },
            sex:{
                type:String,
                required:true,
            },
            age:{
                type:Number,
                default:99   //默认值
            }
        },
      备注：props是只读的，VUE底层会检测props的修改，如果进行修改，会发出警告，
      如要修改，那么请复制props的内容到data中一份，然后去需改data中的内容；

## mixin(混入)
   功能：可以把多个组件的共用配置提取成一个混用对象
   使用方式
   第一步、定义混合：
   {
       data(){},
       methods:{},
       ....
   }
   第二步、使用混入：
    import xxx from '....../mixin.js'
    （1） 局部混入： props:[xxx,xxxx]
     (2)  全局混入： Vue.minxi(xxx)


## 插件
   功能：用于增强Vue
   本质：包含install方法的一个对象，install的第一个参数是Vue,第二个以后的参数是插件使用者传递的数据（如x,y,z）
   定义插件：
      对象.install = function(Vue,options){
        //定义全局过滤器
        Vue.filter(...)

        //定义全局指令
        Vue.directive(...)

        //定义全局混入
        Vue.mixin(...)

        //给Vue原型上链添加一个方法或属性（VM和VC都可以使用了）
        Vue.prototype.$myMethod = function(){....}
        Vue.prototype.$myProperty = xxx
      }
  使用插件：Vue.use()

## scoped 样式
  作用：让样式在局部生效，防止冲突  但是scoped样式一般不会在App.vue中使用，APP.vue中定义的样式一般是要运行全局使用的
  写法： <style scoped>

## 总结TodoList案例
1、组件化编码路程：
（1）拆分静态组件：组件要按照功能点拆分，命名不与html元素冲突。
（2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
    1）.一个组件在用，放在组件自身即可
    2）.一些组件在用，放在他们共同的父组件上（状态提升）
（3）实现交互：从绑定事件开始
2、props适用于：
  （1）、父组件 ===> 子组件  通信
  （2）、子组件 ===> 父组件  通信（要求父先给子一个函数）
3、使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4、props传过来的若是对象类型的值，修改对象中的属性时VUE不会报错，但不推荐这样做


## 组件的自定义事件
1、一种组件间通信的方式，适用于 ： 子组件 ===> 父组件
2、使用场景： A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）
3、绑定自定义事件：
   1.第一种方式，在父组件中：<Demo @atguigu="test" /> 或者 <Demo v-on:atguigu="test" />
   2.第二种方式，在父组件中：
     <Demo ref="demo"/>
     .....
     mouted(){
       this.$refs.demo.$on('atguigu',this.test)
     }
4、触发自定义事件： this.$emit('atguigu',数据)
5、解绑自定义事件： this.$off('atguigu')
6、组件上也可以绑定原生DOM事件，需要使用.native修饰符
7、注意：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么使用箭头函数，否则this指向会出问题！！！


## 全局事件总线
1、一种组件间通信的方式，适用于任何组件间通信；
2、安装全局事件总线：
  new Vue({
    beforeCreated(){
      Vue.prototype.$bus = this; //安装全局事件总线，$bus就是当前应用的vm
    }
  })

3、使用事件总线：
  1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件目录
  methods(){
    demo(data){.....}
  }
  mounted(){
    this.$bus.$on('xxxx',this.demo)
  }
4、最好在beforeDestory钩子中，用$off去解绑当前组件所用到的事件。

## axio
vue 脚手架配置代理服务器：
  方法一：在vue.config.js中添加如下配置：
      devServer: {
        proxy: 'http://10.10.3.191:8080/'
      }
  说明：1.优点：配置建单，请求资源时直接发给前端即可
        2.缺点：不能配置多个代理，不能灵活的控制请求是否走代理
        3.工作方式：若按照上述配置代理，当请求了前端不存在的资源，那么该请求会转发给服务器（优先匹配前端资源）



  方法二：
      devServer: {
        proxy: {
            '/StudentAction':{    //匹配所有以'/StudentAction'开头的请求路径（除去协议：http,IP:xxx.xxx.xx.xx,port:xx以外的路径）
                target: 'http://10.10.3.191:8080/',   //代理目标的基础路径（协议：IP：端口）
                pathRewrite: {'^/StudentAction':''},
                //ws: true,  //用于支持websocket,默认值是true
                //changeOrigin: true //用于控制请求头中的host值，默认为true
            },
            '/CarAction':{
                target: 'http://10.10.3.191:8081/',
                pathRewrite: {'^/CarAction':''},
                //ws: true,  //用于支持websocket,默认值是true
                //changeOrigin: true //用于控制请求头中的host值，默认为true
            }
        }
    }

    changeOrigin设置为true时，服务器收到的请求头中的host为：10.10.3.191:8080
    changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
    说明：1、优点：可以配置多个代理，且可以灵活的控制请求是否走代理
          2、缺点：配置繁琐，请求资源时必须加前缀

## 插槽
作用： 让父组件可以向子组件指定位置插入html结构，也是一种组件通信的方式，适用于===  父组件>子组件
分类： 默认插槽、具名插槽、作用于插槽
使用方式：
1、默认插槽：
父组件：
        <Category>
           	<div>html结构1</div>
        </Category>
子组件：
        <template>
            <div>
               	<slot>插槽默认内容...</slot>
            </div>
        </template>



2、具名插槽：
父组件：
        <Category>
            <template slot="center">
             	 <div>html结构1</div>
            </template>

            <template v-slot:footer>
               	<div>html结构2</div>
            </template>
        </Category>
子组件：
        <template>
            <div>
               	<slot name="center">插槽默认内容...</slot>
                <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>



3、作用域插槽：
1.理解：数据在子组件的自身，但根据数据生成的结构需要组件的使用者（父组件）来决定。(games数据在Category组件中，但使用数据所遍历出来的结构有父组件决定)
2.具体编码：
父组件中：
		<Category>
			<template scope="scopeData">
				<!-- 生成的是ul列表 -->
				<ul>
					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
				</ul>
			</template>
		</Category>

		<Category>
			<template slot-scope="scopeData">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
			</template>
		</Category>
子组件中：
        <template>
            <div>
                <slot :games="games"></slot>
            </div>
        </template>
		
        <script>
            export default {
                name:'Category',
                props:['title'],
                //数据在子组件自身
                data() {
                    return {
                        games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                    }
                },
            }
        </script>


## VUEX
1、创建文件 /src/store/index.js
//引入VUE核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用VUEX插件
Vue.use(Vuex)

//准备actions--用于相应组件中的动作
const actions = {
  jia(context, value){
        context.commit("JIA",value);
    },
}

//准备mutations --用于操作数据
const mutations = {
   JIA(state, value){
        state.sum += value;
    },
}

//准备state -- 用于存储数据
const state = {
      sum:0 //当前和
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
        


2、在main.js中创建并传入store配置项
//引入store
import store from './store'
new Vue({
  //完成功能，将APP组件放入容器中
  render: h => h(App),
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
}).$mount('#app')

3、组件中读取vuex中数据，$store.state.sum
4、组件中修改vuex的数据，$store.dispatch("actions中的方法名", 数据)  后者 $store.commit("mutations中的方法名", 数据);
  备注：若没有网络请求或者其他业务逻辑，组件中也可以越过actions,即不写dispatch,直接编写commit;

5、四个map方法的使用
  5.1、mapState方法：用于帮助我们映射state中的数据为计算属性
    computed: {
        //借助mapState生成计算属性，从state中获取数据（对象写法）
        //...mapState({sum:'sum',school:'school',subject:'subject'}),
        //借助mapState生成计算属性，从state中获取数据（数组写法）
        ...mapState(['sum','school','subject']),
    }

  5.2、mapGetters方法：用于帮助我们映射getters中的数据为计算属性
      computed: {
        //借助mapGetters生成计算属性，从getters中获取数据（对象写法）
        //...mapGetters({bigSum:'bigSum'}),
        //借助mapGetters生成计算属性，从getters中获取数据（数组写法）
        ...mapGetters(['bigSum']),
    }

  5.3、mapActions方法：用于帮助我们生成与Actions对话的方法，及：包括$store.dispatch(XXX)的函数
  methods: {
        //借助mapActions生成对应的方法，方法中会调用dispatch去联系Actions（对象方法）
        //...mapActions({jiaOdd:"jiaOdd",jiaWait:"jiaWait"}),

        //借助mapActions生成对应的方法，方法中会调用dispatch去联系Actions（对象方法）
        ...mapActions(["jiaOdd","jiaWait"]),
    }
  5.4、mapMutations方法：用于帮助我们生成与Mutations对话的方法，及：包括$store.commit(XXX)的函数
  methods: {
         //借助mapMutations生成对应的方法，方法中会调用commit去联系Mutations（对象方法）
        //...mapMutations({JIA:"JIA",JIAN:"JIAN"}),

         //借助mapMutations生成对应的方法，方法中会调用commit去联系Mutations（对象方法）
        ...mapMutations(["JIA","JIAN"]),
    }
  
6、VUEX模块化+命名空间
  6.1、目的：让代码更好的维护，让多种数据分类更加准确
  6.2、修改Store.js
     --count.js
    export default {
    namespaced: true,    //VUEX模块化，必须配置namespaced为true
    actions:{......},
    mutations:{......},
    state:{......},
    getters:{......}
  }

    --personList.js
    export default {
    namespaced: true,    //VUEX模块化，必须配置namespaced为true
    actions:{......},
    mutations:{......},
    state:{......},
    getters:{......}
  }

     --store/index.js
     import count from './count'
     import personList from './personList'

    export default new Vuex.Store({
    modules:{
        countOptions: count,
        personOptions: personList
     }
    })

    6.3、开启命名空间后，组件中读取state数据：
    //方式一：自己直接读取
    this.$store.state.personOptions.personList
    //方式二：借助mapState读取
    ......mapState('countOptions',['sum','school','subject'])

    6.4、开启命名空间后，组件中读取getters数据
    //方式一：自己直接读取
    this.$store.getters['personOptions/firstPeopleName']
    //方式二：借助mapGetters读取
    ......mapGetters('countOptions',['bigSum']);

    6.5、开启命名空间后，组件中调用dispatch
    //方式一：自己直接dispatch
    this.$store.dispatch('personOptions/addPersonWang',person)
    //方式二：借助mapActions:
    ......mapActions('countOptions',["jiaOdd","jiaWait"])

    6.6、开启命名空间后，组件中调用commit
    //方式一：自己直接commit
    this.$store.commit('personOptions/ADD_PERSON',personObj)
    //方式二：借助mapMutations
    ......mapMutations('countOptions',["JIA","JIAN"])

  ## VUE-ROUTER
  一、基本使用
     1.安装vue-router,命令 npm i vue-router
     2.引用插件 Vue.use(VueRouter)
     3.编写router配置项
       router/index.js

  //改文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'

//创建router实例对象，去管理一组一组的路由规则
export default new VueRouter({
    routes:[
        {
            'path':'/about',
            component:About
        },
        {
            'path':'/home',
            component:Home
        }
    ]
})

    4.实现切换（active-class可配置高亮样式）
       	<router-link class="list-group-item" active-class="active" to="/about">About</router-link>

    5.指定展示位置
      <router-view></router-view>

  二、几个注意点
    1.路由组件通常存放在pages文件夹中，一般组件通常存放在components文件夹；
    2.通过切换，隐藏路由组件，默认是被销毁掉的，需要的时候去挂载
    3.每个路由组件都有自己$route（路由）属性，里面存储着自己的路由信息
    4.这个应用只有一个ruoter（路由器）,可以通过组件中的$router属性获得

  三、多级路由
    1.配置路由规则，使用children配置项：
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
                    component:Message
                },{
                    path:'news',
                    component:News
                }
            ]
        }
    ]

    2.跳转：
    <router-link class="list-group-item" active-class="active" to="/home/news"> News</router-link>

  四、路由的query参数
    1.传递参数：
     <!-- 跳转路由并携带query参数，to 的字符串写法 -->
     <router-link :to="`/home/message/detail?id=666&title=你好`">跳转</router-link>

      <!-- 跳转路由并携带query参数，to 的对象写法 - -->
                <router-link :to="{
                    path : '/home/message/detail',
                    query: {
                        id:666,
                        title:'你好'
                    }
                    }">跳转</router-link>

    2.接受参数：
     $route.query.id
     $route.query.title

  五、命名路由
    1.作用：可以简化路由的跳转
    2.如何使用
       I.给路由命名：
         {
              name:'xaingqing',   //给路由命名
              path:'detail',
              component:Detail
          }
        II.简化跳转
        <!-- 简化前，需要写完整的路径 -->
        <router-link to="demo/test/detail">跳转</router-link>

        <!-- 简化后，直接通过名字跳转 -->
        <router-link :to="{name:'xiangqing'}">跳转</router-link>

        <!-- 简化写法，配合传递参数 - -->
        <router-link :to="{
                    name : 'xaingqing',
                    query: {
                        id:666,
                        title:'张三'
                    }
                    }">跳转</router-link>
  六、路由的params参数
     1、配置路由：声明接受params参数
                       {
                            name:'xaingqing',
                            path:'detail/:id/:title',  //使用占位符声明params参数
                            component:Detail
                        }

    2、传递参数：
                <!-- 跳转路由并携带params参数，to 的字符串写法 -->
                <router-link :to="`/home/message/detail/6666/你好`">跳转</router-link>-->

                <!-- 跳转路由并携带params参数，to 的对象写法(必须使用name,不能使用path) - -->
                <router-link :to="{
                    name : 'xaingqing',
                    params: {
                        id:6666,
                        title:'你好'
                    }
                    }">跳转</router-link>
    特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置项
   
   3、接受参数：
     $route.params.id
     $route.params.title

  七、路由的props配置
     作用：让路由组件更方便的传递参数
                          {
                            name:'xaingqing',
                            //path:'detail/:id/:title',
                            path:'detail',
                            component:Detail,

                            //第一种写法：props值为对象，该对象中的所有key-value都会以props的形式传递给Detail组件
                            //props:{id: 1,title: 'hello'}

                            //第二种写法：props值为布尔值，若布尔值为true，则把该路由组件收到的所有params参数，通过props传递给Detail组件
                            //props:true

                            //第三种写法：props为函数（参数为$route），该函数返回的对象中每一组key-value都会通过props传递Detail组件
                            props({query}){
                                return {id:query.id,title:query.title}
                            }
                        }

  八、<router-link>的replace属性
    1、作用：控制路由跳转时操作浏览器历史记录的模式
    2、浏览器的历史记录有两种写入方式：分别是push和replace，push为追加历史记录，replace是替换当前记录。路由跳转时候默认为push
    3、如何开启replace模式：<router-link replace .....>跳转</router-likn>

  九、编程式路由导航
    1、作用：不借助<router-link>实现路由跳转，让路由跳转更加灵活
    2、具体编码：
       借助$router的两个API跳转
       this.$router.push({
                name : 'xaingqing',
                    query: {
                        id:XXXX,
                        title:XXXX
                    }
            })
      this.$router.replace({
                name : 'xaingqing',
                    query: {
                        id:XXXX,
                        title:XXXX
                    }
            })

      this.$router.forward()  //前进
      this.$router.back()   //后退
      this.$router.go(-2)   //可前进也可后退
    
  十、缓存路由组件
     1.作用：让不展示的路由组件保持挂载，不被销毁
     2.具体编码
            <!--缓存多个路由组件(数组)-->
            <!--<keep-alive :include="['News','Messages']" > 
                <router-view></router-view>
            </keep-alive>-->

            <!--缓存一个路由组件(字符串)-->
            <keep-alive include="News">  <!-- include为组件name -->
                <router-view></router-view>
            </keep-alive>
  十一、两个新的生命周期钩子（用于配合keepAlive状态使用）
     1.作用：路由组件所独有的两个钩子，用于获取路由组件的激活状态
     2.具体名字：  activated 路由组件被激活时触发     deactivated 路由组件失活是触发

  十二、路由守卫
     1.作用：对路由进行权限控制
     2.分类：全局守卫、独享守卫、组件内守卫

     3.全局路由守卫：
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


     4.独享路由守卫，只有beforeEnter，没有afterEnter：
     {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    meta:{isAuth: true, title:'新闻'},
                    beforeEnter:(to,from,next) =>{
                        console.log("独享路由守卫",to,from);
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
                    }
                }
      }

      5.组件内守卫
    //进入守卫，通过路由规则，进入该组件时被调用
    beforeRouteEnter (to, from, next) {
    },
    //离开守卫，通过路由规则，离开该组件时被调用
    beforeRouteLeave (to, from, next) {
    }

    13、路由器的两种工作模式
      1.对于一个URL来说，什么是hash值？-------#及其后面的内容就是hash值
      2.hash值不会包含在HTTP请求中，即：hash值不会带给服务器
      3.hash模式
         1.地址中永远带着#号，不美观
         2.若以后将地址通过第三方手机app分享，若APP校验严格，则地址会被标记为不合法的
         3.兼容性较好
      4.history模式
         1.地址干净，美观
         2.兼容性和hash模式相比稍差
         3.应用部署上线时，需要后端人员开发支持，解决刷新页面服务器404的问题
         