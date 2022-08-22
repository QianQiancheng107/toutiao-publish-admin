
/* 项目的启动入口 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 创建vue 根实例
// 把router 配置到根实例中
// 通过render方法把 APP根组件渲染到 #app入口节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
