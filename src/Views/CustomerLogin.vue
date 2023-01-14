<template>
  <div>
    <div class="container mx-auto sm:px-10">
      <div class="grid grid-cols-1 gap-4 place-items-center">
        <div class="xl:h-auto xl:my-10 bg-rgb-white xl:p-16 rounded-lg">
          <div
            class="my-auto mx-auto bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-3/4 xl:w-11/12"
          >
            <div>
              <h2
                class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
              >
                Login
              </h2>
            </div>

            <div class="intro-x mt-8">
              <div>
                <label class="form-label text-md font-bold"
                  >Account Number</label
                >
                <input
                  type="text"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="First Name"
                  v-model="accountNumber"
                />
              </div>

              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Password</label
                >
                <input
                  type="password"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
            </div>

            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button class="btn btn-blue" @click="submitForm">Login</button>
              <button
                class="btn bg-blue-500 text-white mt-3"
                @click="$router.push({ name: 'csRegister' })"
              >
                Don't have an account? Sign up now
              </button>
            </div>
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
      userInfo: '',
      password: '',
      accountNumber: '',
    }
  },
  created() {},
  methods: {
    submitForm() {
      const url = `https://localhost:7212/api/v1/Login?accountNumber=${this.accountNumber}&Password=${this.password}`
      axios.post(url).then((res) => {
        const userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        if (userInfo.accountType == 2) {
          this.$router.push({ path: '/admin/home' })
        } else {
          this.$router.push({ path: '/home' })
        }
      })
    },
  },
}
</script>
