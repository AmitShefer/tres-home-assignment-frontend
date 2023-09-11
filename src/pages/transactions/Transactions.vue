<template>
  <div class="container page-width">
    <p class="title">Transactions</p>
    <p class="sub-title">{{ userTransactions.length }} entries found</p>
    <filters-modal
      @onClose="showFiltersModal = false"
      :is-active="showFiltersModal"
    ></filters-modal>
    <create-transaction-modal
      @onClose="showCreateTransactionModal = false"
      :is-active="showCreateTransactionModal"
    ></create-transaction-modal>
    <div class="action-buttons">
      <div class="action-button" @click="showCreateTransactionModal = true">
        <img src="/assets/images/plus-icon.png" width="17" />
        <p>Create</p>
      </div>
      <div class="action-button" @click="showFiltersModal = true">
        <img src="/assets/images/filter-icon.png" width="17" />
        <p>Filters</p>
      </div>
    </div>
    <div v-if="isLoading" class="loading-indicator-container">
      <div class="loading-indicator"></div>
    </div>
    <transactions-table
      v-if="!isLoading && userTransactions.length > 0"
      :user-transactions="userTransactions"
    ></transactions-table>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { callRequest, GET } from "@/classes/network-caller";
import { UserTransaction } from "@/classes/types";
import TransactionsTable from "@/pages/transactions/transactions-table/TransactionsTable.vue";
import FiltersModal from "@/pages/transactions/filters-modal/FiltersModal.vue";
import CreateTransactionModal from "@/pages/transactions/create-transaction-modal/CreateTransactionModal.vue";
declare interface DataModel {
  showFiltersModal: boolean;
  showCreateTransactionModal: boolean;
  isLoading: boolean;
  userTransactions: UserTransaction[];
}
@Options({
  data(): DataModel {
    return {
      showFiltersModal: false,
      showCreateTransactionModal: false,
      isLoading: false,
      userTransactions: [],
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      this.isLoading = true;
      const routeQuery = this.$route.query;
      callRequest<UserTransaction[]>({
        method: GET,
        api: "/v1/user-transactions",
        data: {
          start_value: routeQuery.start_value,
          end_value: routeQuery.end_value,
          start_date: routeQuery.start_date,
          end_date: routeQuery.end_date,
        },
      }).then((response) => {
        this.isLoading = false;
        this.userTransactions = response.data;
      });
    },
  },
  components: {
    CreateTransactionModal,
    FiltersModal,
    TransactionsTable,
  },
})
export default class Transactions extends Vue {}
</script>
<style scoped>
.title {
  font-weight: bold;
  font-size: 25px;
}
.sub-title {
  font-size: 14px;
  margin-top: 10px;
  color: #555;
  margin-bottom: 40px;
}
.loading-indicator-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.loading-indicator {
  margin-top: 75px;
}
.action-buttons {
  display: flex;
  align-items: center;
}
.action-button {
  cursor: pointer;
  display: inline-flex;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #fafafa;
  margin-right: 15px;
  padding: 5px 10px;
  border-radius: 4px;
}
.action-button p {
  margin-left: 5px;
}
</style>
