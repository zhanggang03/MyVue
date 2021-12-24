/*
该文件是整个项目的入口文件
 */

//引入VUE
import Vue from 'vue'

//引入APP组件，他是所有组件的父组件
import App from './App.vue'

//引入插件
import plugins from './plugins'

//关闭VUE的生产提示
Vue.config.productionTip = false

//应用插件
Vue.use(plugins,1,2,3)

//创建VUE的实例对象---VM
new Vue({
  //完成功能，将APP组件放入容器中
  render: h => h(App),
}).$mount('#app')
