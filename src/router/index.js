import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/login'
import Home from '../view/home'
import User from '../view/user/user'
import DataList from '../view/database/datalist'
import GoodsAgm from '../view/goods/goodsagm'
import GoodsLei from '../view/goods/goodslei'
import GoodsList from '../view/goods/goodslist'
import Limit from '../view/limit/limit'
import Role from '../view/limit/role'
import Order from '../view/order/order'
import Welcome from '../view/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/welcome',
      children: [
        {
          path: 'welcome',
          component: Welcome
        },
        {
          path: 'datalist',
          component: DataList
        },
        {
          path: 'goodsagm',
          component: GoodsAgm
        },
        {
          path: 'goodslei',
          component: GoodsLei
        },
        {
          path: 'goodslist',
          component: GoodsList
        },
        {
          path: 'limit',
          component: Limit
        },
        {
          path: 'role',
          component: Role
        },
        {
          path: 'order',
          component: Order
        },
        {
          path: 'user',
          component: User
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const tokenStr = window.sessionStorage.getItem('token')
  // console.log(tokenStr)
  // console.log(to)
  if (to.path === '/login') return next()
  if (!tokenStr) {
    next('/login')
  } else next()
})

export default router
