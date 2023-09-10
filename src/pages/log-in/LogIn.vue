<template>
  <div class="container">
    <div class="how-it-works-banner">
      <img src="/assets/images/tres-how-it-works.svg" />
    </div>
    <div class="log-in-container">
      <div class="log-in-form">
        <img src="/assets/images/tres-logo.svg" width="135" />
        <p class="welcome-back-title">Welcome back!</p>
        <p class="enter-details-text">Please enter your details</p>
        <div>
          <input v-model="email" placeholder="Email" class="form-input" />
          <input
            v-model="password"
            placeholder="Password"
            type="password"
            class="form-input password-input"
          />
        </div>
        <div class="log-in-button-container">
          <a @click="logIn" class="button">Log in</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { callRequest, POST } from "@/classes/network-caller";
import { LogInResponseModel } from "@/classes/types";
import router, { RouteName } from "@/router";
import { setAccessToken } from "@/classes/utils";
declare interface DataModel {
  email: string;
  password: string;
}
@Options({
  data(): DataModel {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logIn() {
      callRequest<LogInResponseModel>({
        method: POST,
        api: "/v1/authenticate",
        data: {
          email: this.email,
          password: this.password,
        },
      }).then((response) => {
        const responseData = response.data;
        setAccessToken(responseData.access_token);
        this.$store.commit("setCurrentUser", responseData.user);
        router.push({ name: RouteName.Transactions });
      });
    },
  },
})
export default class LogIn extends Vue {}
</script>
<style scoped>
.container {
  display: flex;
}
.how-it-works-banner {
  background-color: #f5ecef;
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.how-it-works-banner img {
  width: 80%;
}
.log-in-container {
  background-color: white;
  width: 50%;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 70px;
}
.log-in-form {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.welcome-back-title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 60px;
  margin-bottom: 15px;
}
.enter-details-text {
  color: #777;
  margin-bottom: 40px;
}
.form-input {
  width: 100%;
}
.password-input {
  margin-top: 20px;
}
.log-in-button-container {
  width: 100%;
  margin-top: 25px;
}
.log-in-button-container .button {
  width: 100%;
}
</style>
