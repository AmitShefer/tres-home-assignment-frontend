<template>
  <modal
    :is-active="isActive"
    title="Create transaction"
    @onClose="$emit('onClose')"
  >
    <div class="inputs-container">
      <div class="input-container">
        <p>Hash</p>
        <input
          v-model="hash"
          placeholder="0x5f33f947ef33a1cf277138b87313a542eeab3e35ae74e4ecb79828d7e864894b"
        />
      </div>
      <div class="input-container">
        <p>Method</p>
        <input v-model="method" placeholder="Transfer" />
      </div>
      <div class="input-container">
        <p>Date</p>
        <input v-model="date" type="date" />
      </div>
      <div class="input-container">
        <p>From</p>
        <input
          v-model="_from"
          placeholder="0xF50Ce77b2BAa1dbF79A10a916DB0Ea5aEFBc4d2f"
        />
      </div>
      <div class="input-container">
        <p>To</p>
        <input
          v-model="to"
          placeholder="0xa27CEF8aF2B6575903b676e5644657FAe96F491F"
        />
      </div>
      <div class="input-container">
        <p>Value</p>
        <input v-model="value" placeholder="0.043456122" />
      </div>
    </div>
    <div class="input-container">
      <p>Fee</p>
      <input v-model="fee" placeholder="0.00022653" />
    </div>
    <div class="footer-container">
      <div v-if="isCreating" class="loading-indicator"></div>
      <a v-else @click="submit" class="button submit-button">Submit</a>
    </div>
  </modal>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "@/shared-components/modal/Modal.vue";
import { callRequest, POST } from "@/classes/network-caller";
declare interface DataModel {
  isCreating: boolean;
  hash: string;
  method: string;
  date: string;
  _from: string;
  to: string;
  value: string;
  fee: string;
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
      isCreating: false,
      hash: "",
      method: "",
      date: "",
      _from: "",
      to: "",
      value: "",
      fee: "",
    };
  },
  methods: {
    submit() {
      this.isCreating = true;
      callRequest({
        method: POST,
        api: "/v1/user-transactions",
        data: {
          hash: this.hash,
          method: this.method,
          date: this.date,
          from: this._from,
          to: this.to,
          value: this.value,
          fee: this.fee,
        },
      }).then(() => {
        this.emptyValues();
        this.$emit("onClose");
      });
    },
    emptyValues() {
      this.hash = "";
      this.method = "";
      this.date = "";
      this._from = "";
      this.to = "";
      this.value = "";
      this.fee = "";
    },
  },
  components: {
    Modal,
  },
})
export default class CreateTransactionModal extends Vue {}
</script>
<style scoped>
.inputs-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
.input-container {
  width: 48%;
  margin-bottom: 20px;
}
.input-container p {
  margin-bottom: 10px;
}
.input-container input {
  width: 100%;
}
.submit-button {
  margin-top: 10px;
  width: 100%;
}
.footer-container {
  display: flex;
  justify-content: center;
}
</style>
