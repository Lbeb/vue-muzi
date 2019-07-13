import VueRouter from 'vue-router'

//导入tarbar上的组件
import HomeContainer from './components/tarbar/HomeContainer.vue'
import MemberContainer from './components/tarbar/MemberContainer.vue'
import SearchContainer from './components/tarbar/SearchContainer.vue'
import ShopcarContainer from './components/tarbar/ShopcarContainer.vue'
// 导入news上的组件
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'
// 导入photos上的组件
import PhotosList from './components/photos/PhotosList.vue'
import PhotosInfo from './components/photos/PhotosInfo.vue'
 
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
    },
    {
      path: '/home/photoslist',
      component: PhotosList
    },
    {
      path: '/home/photosinfo/:id',
      component: PhotosInfo
    }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类
})

export default router