/*
该文件是整个项目的入口文件
 */

//引入VUE
import Vue from 'vue'

//引入APP组件，他是所有组件的父组件
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'

//引入router
import router from './router'

//关闭VUE的生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)

//创建VUE的实例对象---VM
new Vue({
  //完成功能，将APP组件放入容器中
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
}).$mount('#app')
