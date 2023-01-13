<template>
  <div class="container mx-auto max-w-lg">
    <h3 class="font-bold text-3xl">Welcome to your Banking Account</h3>
    <h3>
      Account Balance

      <span class="font-bold text-2xl text-black">
        {{ accountBalance }} £
      </span>
    </h3>
    <h3>
      Number of Transactions
      <span class="font-bold text-xl text-black">{{
        numberOfTransaction
      }}</span>
    </h3>
    <div class="">
      <div class="flex mt-5 justify-end">
        <button @click="logout" class="btn bg-red-500 py-3 px-4">Logout</button>
      </div>
    </div>
    <div class="">
      <br />
      <br />
      <div class="grid grid-cols-2 place-items-center">
        <div class="">
          <router-link to="/customer/deposit">
            <button class="btn bg-gray-600 text-white">Deposit</button>
          </router-link>
        </div>
        <div class="">
          <router-link to="/customer/withdraw">
            <button class="btn bg-blue-500 text-white">Withdraw</button>
          </router-link>
        </div>
      </div>
      <div class="py-4">
        <router-link to="customer/closeAccount">
          <button class="btn bg-red-700 text-white text-center w-full">
            Close Account
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      accountBalance: '',
      numberOfTransaction: '',
      userInfo: '',
    }
  },
  created() {
    const data = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(data)
  },
  mounted() {
    axios
      .get(
        `https://localhost:7212/api/v1/getAccountBalanceByAccountNumber?accountNumber=${this.userInfo.accountNumber}`
      )
      .then((res) => {
        this.accountBalance = res.data
        axios
          .get(
            `https://localhost:7212/api/v1/numberOfTransactionbyAcccount?AccountNumber=${this.userInfo.accountNumber}`
          )
          .then((res) => {
            this.numberOfTransaction = res.data
          })
      })
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({ path: '/customer/login' })
    },
  },
}
</script>

<style></style>
