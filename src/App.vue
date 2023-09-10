<template>
  <nav-bar v-if="shouldShowNavBar"></nav-bar>
  <router-view :key="$route.fullPath" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavBar from "@/shared-components/nav-bar/NavBar.vue";
import { RouteName } from "@/router";
import { isLoggedIn } from "@/classes/utils";
@Options({
  created() {
    if (isLoggedIn()) {
      this.$store.dispatch("fetchCurrentUser");
    }
  },
  computed: {
    shouldShowNavBar() {
      return ![RouteName.LogIn].includes(this.$route.name);
    },
  },
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
</script>
<style>
#app {
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:root {
  --color-button-main: #3e00ff;
}
body {
  margin: 0;
}
html {
  background-color: white;
}
div,
img {
  display: block;
}
div,
input {
  box-sizing: border-box;
}
.page-width {
  max-width: 1400px;
  margin: 0 auto;
}
.button {
  font-size: 16px;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  color: white;
  background-color: var(--color-button-main);
}
input {
  font-size: 14px;
  color: #333;
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 6px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: white;
}
p {
  margin: 0;
}
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-inner-spin-button,
input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
.loading-indicator {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.loading-indicator:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #222;
  border-color: #222 transparent #222 transparent;
  animation: loading-indicator-animation 1s linear infinite;
}
@keyframes loading-indicator-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
