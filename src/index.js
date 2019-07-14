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

// // Vue 缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



//导入app组件
import app from './App.vue'

//导入 Mint UI 中的组件

/*import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload
} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload);
*/
// 导入全部 解决图片懒加载图标问题
import MintUI from 'mint-ui'
Vue.use(MintUI)
import './lib/mui/css/mui.min.css'

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 vue-resource 发送ajax情求
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置url前缀
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据格式组织形式 
Vue.http.options.emulateJSON = true

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router //挂载路由
})