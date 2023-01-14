<template>
  <div class="container mx-auto max-w-lg">
    <h3 class="font-bold text-3xl">Withdraw</h3>
    <h3 class="font-bold text-3xl">
      Account Balance

      <span class="font-bold text-2xl text-black">
        {{ accountBalance }} £
      </span>
    </h3>
    <div class="">
      <div class="xl:h-auto xl:my-10 bg-rgb-white xl:p-16 rounded-lg">
        <div
          class="my-auto mx-auto bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-3/4 xl:w-11/12"
        >
          <div class="intro-x mt-8">
            <div>
              <label class="form-label text-md font-bold">Amount</label>
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                placeholder="Amount to be Withdrawn"
                v-model="amount"
              />
            </div>
          </div>

          <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
            <button class="btn bg-blue-500 text-white" @click="submitForm">
              Withdraw
            </button>
          </div>
          <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
            <router-link to="/home">
              <button class="btn bg-gray-600 text-white">Go Back</button>
            </router-link>
          </div>
        </div>
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
      amount: '',
      userInfo: '',
    }
  },
  created() {
    const data = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(data)
    axios
      .get(
        `https://localhost:7212/api/v1/getAccountBalanceByAccountNumber?accountNumber=${this.userInfo.accountNumber}`
      )
      .then((res) => {
        this.accountBalance = res.data
      })
  },
  methods: {
    submitForm() {
      const url = `https://localhost:7212/api/v1/withdraw?AccountNumber=${this.userInfo.accountNumber}&amount=${this.amount}`
      axios.post(url).then((res) => {
        console.log(res)
        this.amount = ''
        axios
          .get(
            `https://localhost:7212/api/v1/getAccountBalanceByAccountNumber?accountNumber=${this.userInfo.accountNumber}`
          )
          .then((res) => {
            this.accountBalance = res.data
          })
      })
    },
  },
}
</script>

<style></style>
