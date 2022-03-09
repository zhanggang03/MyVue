/*
该文件是整个项目的入口文件
 */

//引入VUE
import Vue from 'vue'

//引入APP组件，他是所有组件的父组件
import App from './App.vue'

/* 完整引入ElementUI组件
//引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
*/

//按需引入
import {Button, Row} from 'element-ui'

//关闭VUE的生产提示
Vue.config.productionTip = false

//应用ElementUI组件
//Vue.use(ElementUI)

//全局注册组件
Vue.component(Button.name,Button)
Vue.component(Row.name,Row)

//创建VUE的实例对象---VM
new Vue({
  //完成功能，将APP组件放入容器中
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
}).$mount('#app')
