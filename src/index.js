// 入口文件
import Vue from 'vue'

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入自己定义的路由
import router from './router.js'

//导入格式化时间插件
import moment from 'moment'
// 自定义全局时间过滤器
Vue.filter('Time', function(dataStr, pattern= 'YYYY-MM-DD HH:mm:ss') {
   return moment(dataStr).format(pattern)
})


//导入app组件
import app from './App.vue'

//导入 Mint UI 中的组件
import {
  Header,
  Swipe,
  SwipeItem,
  Button
} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 vue-resource 发送ajax情求
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005'

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router //挂载路由
})