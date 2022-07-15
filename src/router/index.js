import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/params.vue'

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home, children: [
      { path: '', redirect: 'welcome' },
      { path: 'welcome', component: Welcome, children: [
        { path: '', redirect: 'users' },
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'roles', component: Roles },
        { path: 'goods', component: Cate },
        { path: 'params', component: Params },
      ] },
    ] }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.localStorage.getItem('token')
  if(!tokenStr) return next('login')
  next()
})

export default router

