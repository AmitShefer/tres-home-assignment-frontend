<template>
  <Modal
    @onClose="$emit('onClose')"
    :is-active="isActive"
    title="Search filters"
  >
    <div class="inputs-container">
      <div class="input-container">
        <p class="input-title">Start value</p>
        <input v-model="startValue" type="text" placeholder="0.25831" />
      </div>
      <div class="input-separator"></div>
      <div class="input-container">
        <p class="input-title">End value</p>
        <input v-model="endValue" type="text" placeholder="0.35831" />
      </div>
    </div>
    <div class="inputs-container">
      <div class="input-container">
        <p class="input-title">Start date</p>
        <input
          v-model="startDate"
          class="search-filters-start-date"
          type="date"
          placeholder="01/01/2023"
        />
      </div>
      <div class="input-separator"></div>
      <div class="input-container">
        <p class="input-title">Start time</p>
        <input
          v-model="startTime"
          class="search-filters-end-date"
          type="time"
          placeholder="12:00"
        />
      </div>
    </div>
    <div class="inputs-container">
      <div class="input-container">
        <p class="input-title">End date</p>
        <input
          v-model="endDate"
          class="search-filters-start-date"
          type="date"
          placeholder="01/01/2023"
        />
      </div>
      <div class="input-separator"></div>
      <div class="input-container">
        <p class="input-title">End time</p>
        <input
          v-model="endTime"
          class="search-filters-end-date"
          type="time"
          placeholder="12:00"
        />
      </div>
    </div>
    <a @click="submit" class="button submit-button">Submit</a>
  </Modal>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import router, { RouteName } from "@/router";
import Modal from "@/shared-components/modal/Modal.vue";
import moment from "moment";
declare interface DataModel {
  startValue: string;
  endValue: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}
@Options({
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data(): DataModel {
    return {
      startValue: "",
      endValue: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    };
  },
  created() {
    this.setInitValues();
  },
  methods: {
    setInitValues() {
      const routeQuery = this.$route.query;
      this.startValue = routeQuery.start_value;
      this.endValue = routeQuery.end_value;
      this.startDate = routeQuery.start_date
        ? this.getInitDate(routeQuery.start_date)
        : "";
      this.endDate = routeQuery.end_date
        ? this.getInitDate(routeQuery.end_date)
        : "";
      this.startTime = routeQuery.start_date
        ? this.getTimeFromDate(routeQuery.start_date)
        : "";
      this.endTime = routeQuery.end_date
        ? this.getTimeFromDate(routeQuery.end_date)
        : "";
    },
    submit() {
      router.push({
        name: RouteName.Transactions,
        query: {
          start_value: this.startValue || undefined,
          end_value: this.endValue || undefined,
          start_date: this.combineDateAndTime(this.startDate, this.startTime),
          end_date: this.combineDateAndTime(this.endDate, this.endTime),
        },
      });
    },
    combineDateAndTime(dateString: string, timeString: string) {
      const combinedDate = new Date(`${dateString} ${timeString}`);
      if (dateString.length == 0) {
        return undefined;
      }
      return combinedDate.toUTCString();
    },
    getInitDate(dateString: string) {
      return moment(dateString).format("YYYY-MM-DD");
    },
    getTimeFromDate(dateString: string) {
      return moment(dateString).format("HH:mm");
    },
    clearFilters() {
      router.push({ name: RouteName.Transactions });
    },
  },
  components: {
    Modal,
  },
})
export default class FiltersModal extends Vue {}
</script>
<style scoped>
.input-title {
  font-size: 15px;
  margin-bottom: 10px;
}
.inputs-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.input-container {
  width: 50%;
}
.inputs-container {
  padding: 15px 15px;
  border-radius: 6px;
  border: 1px solid #f2f2f2;
  background-color: #fafafa;
  margin-bottom: 25px;
}
.inputs-container input {
  width: 100%;
}
.input-separator {
  display: flex;
  color: #555;
  margin-top: 30px;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 40px;
}
.input-separator:before {
  text-align: center;
  content: "-";
}
.submit-button {
  margin-top: 5px;
  width: 100%;
}
</style>
