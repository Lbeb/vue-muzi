import VueRouter from 'vue-router'

//导入tarbar上的路由
import HomeContainer from './components/tarbar/HomeContainer.vue'
import MemberContainer from './components/tarbar/MemberContainer.vue'
import SearchContainer from './components/tarbar/SearchContainer.vue'
import ShopcarContainer from './components/tarbar/ShopcarContainer.vue'
// 导入news上的路由
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'

//创建路由对象
const router = new VueRouter({
  routes: [{ //路由重定向
      path: '/',
      redirect: '/home'
    },
     {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/shopcar',
      component: ShopcarContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: '/home/newslist',
      component: newslist
    },
    {
      path: '/home/newsinfo/:id',
      component: newsinfo
    }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类
})

export default router