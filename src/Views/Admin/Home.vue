<template>
  <div class="container mx-auto max-w-3xl">
    <div class="font-bold text-2xl text-gray-900 text-center py-4">
      Admin Section
    </div>
    <table class="outer">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Account Number</th>
        <th>Balance</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
      <tr class="" v-for="i in allAccounts">
        <th>
          {{ i.firstName }}
        </th>
        <th>
          {{ i.lastName }}
        </th>
        <th>
          {{ i.email }}
        </th>
        <th>
          {{ i.accountNumber }}
        </th>
        <th>
          {{ i.balance }}
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
          <button
            class="btn bg-blue-700 text-white text-sm"
            @click="generateReport(i.accountNumber)"
          >
            Generate Report
          </button>
        </th>
        <th>
          <button>
            <download-csv :data="reportData" name="BankStatement.csv">
              Download Data
            </download-csv>
          </button>
        </th>
      </tr>
    </table>

    <h3 class="font-bold text-2xl text-gray-900">
      Total Number of Customers {{ allAccounts.length }}
    </h3>
    {{ reportData }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      allAccounts: '',
      reportData: '',
      newReport: '',
    }
  },

  created() {
    axios.get(`https://localhost:7212/api/v1/getAllAccounts`).then((res) => {
      this.allAccounts = res.data
    })
  },
  methods: {
    deleteCustomer(param) {
      axios
        .post(`https://localhost:7212/api/v1/deleteAccount?Id=${param}`)
        .then((res) => {
          axios
            .get(`https://localhost:7212/api/v1/getAllAccounts`)
            .then((res) => {
              this.allAccounts = res.data
            })
        })
    },
    generateReport(accountNumber) {
      axios
        .get(
          `https://localhost:7212/api/v1/generateReport?AccountNumber=${accountNumber}`
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
