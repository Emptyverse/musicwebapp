import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//把store引入进来供路由守卫使用
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"*/ '../views/About.vue')
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    //箭头函数写法 相当于 在上面import组件进来 再写组件名 HomeView那里是一般写法
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    //路由守卫 相当于一个权限判断 判断是否已经登陆
    beforeEnter: (to, from, next) => {
      //除了判断是否是登陆状态 还要判断token 一个条件满足即可
      if(sessionStorage.getItem("user") && (store.state.isLogin || store.state.token || localStorage.getItem('token'))){
        next()
      }else{
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "infoUser" */ '../views/InfoUser.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/SideBar',
    component: () => import(/* webpackChunkName: "sideBar" */'../views/SideBar.vue')
  },
  {
    path: '/dailyPlayList',
    component: () => import(/* webpackChunkName: "dailyPlayList"*/ '../views/DailyPlayList.vue')
  },
  {
    path: '/songList',
    component: () => import(/* webpackChunkName: "songList"*/ '../views/SongList.vue')
  },
  {
    path: '/personalFm',
    component: () => import(/* webpackChunkName: "personalFm"*/ '../views/PersonalFm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//全局守卫 若进入登陆界面则隐藏底部播放组件
router.beforeEach((to,from)=>{
  if(to.path=='/login' || to.path=='/InfoUser' || to.path=='/about'){
    store.state.isFooterMusic=false
  }else{
    store.state.isFooterMusic=true
  }
})

export default router
