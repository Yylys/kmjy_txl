import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[{
      path: 'index',
      name: '/home/index',
      component: () => import('../views/index/Index.vue'),
      meta: {
        keepAlive: true
      }
    },{
      path: 'video',
      name: '/home/video',
      component: () => import('../views/video/Video.vue'),
      meta: {
        keepAlive: true
      }
    },{
      path: 'show',
      name: '/home/show',
      component: () => import('../views/show/Show.vue'),
      meta: {
        keepAlive: true
      }
    },{
      path: 'me',
      name: '/home/me',
      component: () => import('../views/me/Me.vue'),
      meta: {
        keepAlive: true
      }
    }]
  },
  // {
  //   path: '/detail/:movieId',
  //   name: '/detail/movieId',
  //   component: () => import('../views/index/MovieDetail.vue')
  // },
  {
    path: '/personnel',
    name: '/personnel',
    component: () => import('../views/index/personnel_index.vue')
  },
  {
    path: '/department',
    name: '/department',
    component: () => import('../views/index/department_index.vue')
  },
  {
    path: '/Information',
    name: '/Information',
    component: () => import('../views/index/Information.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 滚动行为可以控制路由跳转时 滚动条的位置
  scrollBehavior: function(to, from, savedPosition:any){
    if(savedPosition && to.name=='/home/index'){
      return savedPosition
    }
    return {left:0, top:0}
  }
})

export default router
