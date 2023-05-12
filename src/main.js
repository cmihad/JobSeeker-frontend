import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import './main.css'
import App from './App.vue'
import Home from './Views/CustomerHome.vue'
import CustomerLogin from './Views/CustomerLogin.vue'

import CloseAccount from './Views/CustomerCloseAccount.vue'
import AdminHome from './Views/Admin/Home.vue'
import JsonCSV from 'vue-json-csv'
import UserSignUp from './Views/User/UserSignUp.vue'
import UserInfoEdit from './Views/User/UserFormEdit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'userSignUp', component: UserSignUp },
    { path: '/home', name: 'Home', component: Home },
    { path: '/user/login', name: 'csLogin', component: CustomerLogin },
    { path: '/user/edit', name: 'userEdit', component: UserInfoEdit },

    {
      path: '/admin/home',
      name: 'csAdmin',
      component: AdminHome,
    },
    {
      path: '/customer/closeAccount',
      name: 'csClose',
      component: CloseAccount,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const isUserSignedIn = localStorage.getItem('userInfo')
  if (to.fullPath === '/home' || to.fullPath === '/user/edit') {
    if (!isUserSignedIn) {
      next('/user/login')
    }
  }
  next()
})

const app = createApp(App).use(router)
app.component('downloadCsv', JsonCSV)

app.mount('#app')
