<template>
  <div class="container mx-auto max-w-lg py-8">
    <h3 class="font-bold text-3xl">
      Are you sure you want to close your account? (withdraw all the money
      before closing the account)
    </h3>
    <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
      <button @click="closeAccount()" class="btn bg-red-800 text-white">
        Yes Close My Account
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {}
  },
  methods: {
    closeAccount() {
      const userInfo = localStorage.getItem('userInfo')

      const account = JSON.parse(userInfo)
      const accountNumber = account.accountNumber

      axios
        .post(`https://localhost:7212/api/v1/deleteAccount?Id=${accountNumber}`)
        .then((res) => {
          console.log(res)
          this.$router.push({ path: '/customer/register' })
        })
    },
  },
}
</script>

<style></style>
