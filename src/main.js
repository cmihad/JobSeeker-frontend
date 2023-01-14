import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import './main.css'
import App from './App.vue'
import Home from './Views/CustomerHome.vue'
import CustomerLogin from './Views/CustomerLogin.vue'
import CustomerRegister from './Views/CustomerRegister.vue'
import Deposit from './Views/DepositMoney.vue'
import Withdraw from './Views/WithdrawMoney.vue'
import CloseAccount from './Views/CustomerCloseAccount.vue'
import AdminHome from './Views/Admin/Home.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'csRegister', component: CustomerRegister },
    { path: '/home', name: 'Home', component: Home },
    { path: '/customer/login', name: 'csLogin', component: CustomerLogin },
    // {
    //   path: '/customer/register',
    //   name: 'csRegister',
    //   component: CustomerRegister,
    // },
    {
      path: '/admin/home',
      name: 'csAdmin',
      component: AdminHome,
    },
    {
      path: '/customer/deposit',
      name: 'csDeposit',
      component: Deposit,
    },
    {
      path: '/customer/withdraw',
      name: 'csWithdraw',
      component: Withdraw,
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
  if (
    to.fullPath === '/home' ||
    to.fullPath === '/customer/withdraw' ||
    to.fullPath === '/customer/deposit' ||
    to.fullPath === 'customer/closeAccount'
  ) {
    if (!isUserSignedIn) {
      next('/customer/login')
    }
  }
  next()
})

const app = createApp(App).use(router)

app.mount('#app')
