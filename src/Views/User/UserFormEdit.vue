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
                User CV Edit
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
                  >Enter Your Email</label
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
                  >Enter your phone number</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  v-model="model.phoneNumber"
                />
              </div>
              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Your area of areaOfExpertise</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  v-model="model.areaOfExpertise"
                />
              </div>
              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Your education</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  v-model="model.education"
                />
              </div>
              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Your min education</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  v-model="model.minEducation"
                />
              </div>
              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Your address</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  placeholder="abc@def.com"
                  v-model="model.address"
                />
              </div>
              <div class="mt-4">
                <label class="form-label text-md font-bold"
                  >Enter Your Work Email</label
                >
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block border-black border-2"
                  v-model="model.city"
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
              <button class="btn btn-blue" @click="submitForm">edit CV</button>
              <br />

              <br />
              <button
                class="btn bg-blue-700 text-white text-sm"
                @click="generateReport(this.idMain)"
              >
                DownloadCV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf'

// Default export is a4 paper, portrait, using millimeters for units

import axios from 'axios'
export default {
  data() {
    return {
      agree: false,
      confirmPassword: '',
      idMain: '',
      model: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        areaOfExpertise: '',
        education: '',
        minEducation: '',
        address: '',
        city: '',
        confirmPassword: '',
      },

      reportData: '',
    }
  },
  methods: {
    submitForm() {
      axios
        .post('https://localhost:7074/api/v1/registeAccount', this.model)
        .then((res) => {
          const userInfo = res.data
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
        })
    },
    generateReport(accountNumber) {
      axios
        .get(
          `https://localhost:7074/api/v1/getAccountByAccountNumber?Id=${accountNumber}`
        )
        .then((res) => {
          this.reportData = res.data
          const doc = new jsPDF()

          const report = Object.entries(this.model)
          console.log(report)

          for (
            let i = 0, j = 10;
            i < report.length, j < report.length * 10;
            i++, j = j + 17
          ) {
            doc.text(report[i], 10, j)
          }

          doc.save('a4.pdf')
        })
    },
  },
  created() {
    let userInfo1 = localStorage.getItem('userInfo')
    userInfo1 = JSON.parse(userInfo1)
    this.idMain = userInfo1.id
    const id = userInfo1.id

    axios
      .get(`https://localhost:7074/api/v1/getAccountByAccountNumber?Id=${id}`)
      .then((res) => {
        console.log(res.data)
        this.model.firstName = res.data.firstName
        this.model.lastName = res.data.lastName
        this.model.email = res.data.email
        this.model.phoneNumber = res.data.phoneNumber
        this.model.areaOfExpertise = res.data.areaOfExpertise
        this.model.education = res.data.education
        this.model.minEducation = res.data.minEducation
        this.model.address = res.data.address
        this.model.city = res.data.city
        this.model.confirmPassword = res.data.confirmPassword
      })
  },
}
</script>
