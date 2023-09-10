<template>
  <div class="transactions-table">
    <table v-if="userTransactions.length > 0">
      <thead>
        <tr>
          <th>Hash</th>
          <th>Method</th>
          <th>Date</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tr v-for="transaction in userTransactions" :key="transaction.id">
        <td>
          <p>{{ transaction.txn_hash }}</p>
        </td>
        <td>
          <p>{{ transaction.method }}</p>
        </td>
        <td>
          <p>{{ formatDate(transaction.date) }}</p>
        </td>
        <td>
          <p>{{ transaction.from }}</p>
        </td>
        <td>
          <p>{{ transaction.to }}</p>
        </td>
        <td>
          <p>{{ transaction.value }} ETH</p>
        </td>
        <td>
          <p>{{ transaction.fee }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { formatDate } from "@/classes/time-helper";
import { UserTransaction } from "@/classes/types";
import { PropType } from "vue";
@Options({
  props: {
    userTransactions: {
      type: Array as PropType<UserTransaction[]>,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
})
export default class TransactionsTable extends Vue {}
</script>
<style scoped>
.transactions-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  border: 2px solid #f2f2f2;
  background-color: white;
}
.container table {
  table-layout: fixed;
  border-collapse: collapse;
  text-align: left;
  width: 100%;
}
.container table thead th {
  font-size: 14px;
  color: #222;
  background-color: #f2f2f2;
  padding: 10px 20px;
}
.container table tr td {
  padding: 15px 20px;
}
.container table tr td p {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container table thead tr th:first-child {
  border-top-left-radius: 7px;
}
.container table thead tr th:last-child {
  border-top-right-radius: 7px;
}
</style>
