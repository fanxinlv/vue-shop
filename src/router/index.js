import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'

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
        { path: 'users', component: Users }
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

