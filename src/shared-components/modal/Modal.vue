<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-container">
      <div class="modal-header">
        <p>{{ title }}</p>
        <div @click="$emit('onClose')" class="close-button">
          <img src="/assets/images/x-icon.svg" width="20" />
        </div>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    title: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
})
export default class Modal extends Vue {}
</script>
<style scoped>
.modal {
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-background {
  position: fixed;
  opacity: 0;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  transition: all 0.35s;
}
.modal-container {
  transition: all 0.1s;
  scale: 0;
  border: 1px solid #ccc;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 2;
  border-radius: 10px;
  background-color: white;
  width: 450px;
  overflow-y: auto;
}
.modal-content {
  padding: 20px;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  padding: 20px;
  background-color: #fafafa;
}
.modal.is-active {
  pointer-events: auto;
}
.modal.is-active .modal-background {
  opacity: 0.5;
}
.modal.is-active .modal-container {
  scale: 1;
}
.close-button {
  cursor: pointer;
}
</style>
