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


###VUEX
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
