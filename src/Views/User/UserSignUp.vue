<template>
  <div>
    <div class="container mx-auto sm:px-10">
      <div class="grid grid-cols-1 gap-4 place-items-center">
        <!-- BEGIN: Register Info -->

        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="xl:h-auto xl:my-10 bg-rgb-white xl:p-16 rounded-lg">
          <div
            class="my-auto mx-auto bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-3/4 xl:w-11/12"
          >
            <div>
              <h2
                class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
              >
                Sign up
              </h2>
            </div>

            <div class="intro-x mt-8">
              <div>
                <label class="form-label text-md font-bold">First Name</label>
                <input
                  type="text"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="First Name"
                  v-model="model.firstName"
                />
              </div>

              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Your Work Email</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="abc@def.com"
                  v-model="model.email"
                />
              </div>

              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Set a password</label
                >
                <input
                  type="password"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="Password"
                  v-model="model.password"
                />
              </div>
              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Confirm your password</label
                >
                <input
                  type="password"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="Confirm Password"
                  v-model="ConfirmPassword"
                />
              </div>
            </div>

            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button class="btn btn-blue" @click="submitForm">Register</button>
              <button
                class="btn bg-blue-500 text-white mt-3"
                @click="$router.push({ name: 'csLogin' })"
              >
                Already have an account? Sign in
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
      agree: false,
      confirmPassword: '',
      model: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        areaOfExpertise: '',
        education: '',
        minEducation: '',
        address: '',
        accountType: 0,
        city: 'Uk',
        confirmPassword: '',
        created: '2023-01-13T13:09:21.491Z',
      },
    }
  },
  methods: {
    submitForm() {
      axios
        .post('https://localhost:7074/api/v1/registeAccount', this.model)
        .then((res) => {
          const userInfo = res.data
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$router.push({ name: 'userEdit' })
        })
    },
  },
}
</script>
