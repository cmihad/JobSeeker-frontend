<template>
  <div class="container mx-auto max-w-3xl">
    <div class="font-bold text-2xl text-gray-900 text-center py-4">
      Admin Section
    </div>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        v-model="searchTerm"
        @input="search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Mockups, Logos..."
        required
      />
      <button
        type="submit"
        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </div>

    <div class="flex justify-end"></div>
    <table class="outer">
      <tr>
        <th>First Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Are of areaOfExpertise</th>
        <th>Education</th>
        <th>Action</th>
      </tr>
      <!-- <pre>

        {{ allAccounts }}
      </pre> -->
      <tr class="" v-for="i in allAccounts" :key="i.id">
        <th>
          {{ i.firstName }}
        </th>

        <th>
          {{ i.email }}
        </th>
        <th>
          {{ i.city }}
        </th>
        <th>
          {{ i.areaOfExpertise }}
        </th>
        <th>
          {{ i.minEducation }}
        </th>
        <th>
          <button
            class="btn bg-red-700 text-white text-sm"
            @click="deleteCustomer(i.id)"
          >
            Delete Account
          </button>
        </th>

        <th>
          <button @click="downloadCV(i.id)">Download C V</button>
        </th>
        <th>
          <button>
            <download-csv :data="reportData" name="Report.csv">
              Download Data
            </download-csv>
          </button>
        </th>
      </tr>
    </table>

    <h3 class="font-bold text-2xl text-gray-900">
      Total Number of Job Seeeker {{ allAccounts.length }}
    </h3>
    {{ reportData }}
  </div>
</template>

<script>
import axios from 'axios'
import { jsPDF } from 'jspdf'
export default {
  data() {
    return {
      allAccounts: '',
      reportData: '',
      newReport: '',
      searchTerm: '',
      filteredData: '',
      savedAllAccount: '',
      specificUser: '',
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
    }
  },

  created() {
    axios.get(`https://localhost:7074/api/v1/getAllAccounts`).then((res) => {
      this.allAccounts = res.data
      this.savedAllAccount = res.data
    })
  },
  methods: {
    search() {
      this.filteredData = this.allAccounts

      if (this.searchTerm.length > 1) {
        console.log(this.searchTerm)
        this.allAccounts = this.filteredData.filter(
          (a) =>
            a.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            a.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      } else {
        this.allAccounts = this.savedAllAccount
      }
    },
    deleteCustomer(param) {
      axios
        .post(`https://localhost:7074/api/v1/deleteAccount?Id=${param}`)
        .then((res) => {
          axios
            .get(`https://localhost:7074/api/v1/getAllAccounts`)
            .then((res) => {
              this.allAccounts = res.data
            })
        })
    },
    downloadCV(id) {
      axios
        .get(`https://localhost:7074/api/v1/getAccountByAccountNumber?Id=${id}`)
        .then((res) => {
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
          const reportTemp = this.model

          const report = Object.entries(reportTemp)
          console.log(report)
          const doc = new jsPDF()
          for (
            let i = 0, j = 10;
            i < report.length, j < report.length * 10;
            i++, j = j + 17
          ) {
            console.log(i)
            console.log(j)
            doc.text(report[i], 10, j)
          }

          doc.save('a4.pdf')
        })
    },

    generateReport(accountNumber) {
      axios
        .get(
          `https://localhost:7074/api/v1/generateReport?AccountNumber=${accountNumber}`
        )
        .then((res) => {
          this.reportData = res.data
          this.reportData.forEach((a) => {
            if (a.transactionType == 0) {
              a.transactionType = 'Withdraw'
            } else if (a.transactionType == 1) {
              a.transactionType = 'Deposit'
            }
          })
        })
    },
  },
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 30px 0;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.outer {
  max-width: 700px;
}
</style>
