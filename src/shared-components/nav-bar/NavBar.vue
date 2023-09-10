<template>
  <div class="nav-bar-container">
    <div class="nav-bar-content page-width">
      <div>
        <img src="/assets/images/tres-logo.svg" />
      </div>
      <div v-if="currentUser">
        <div class="user-container">
          <img
            class="user-profile-image"
            :src="currentUser.profile_image_url"
          />
          <p class="username">
            {{ currentUser.first_name }} {{ currentUser.last_name }}
          </p>
        </div>
        <p @click="logOut" class="log-out-button">Log out</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import { logOut } from "@/classes/utils";

@Options({
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    logOut,
  },
})
export default class NavBar extends Vue {}
</script>
<style scoped>
.nav-bar-container {
  background-color: #fafafa;
  border-bottom: 1px solid #f2f2f2;
  padding: 30px 0;
  margin-bottom: 30px;
}
.nav-bar-content {
  display: flex;
  justify-content: space-between;
}
.user-container {
  display: flex;
  align-items: center;
}
.username {
  color: #333;
  margin-left: 7px;
}
.user-profile-image {
  border-radius: 50%;
  object-fit: cover;
  width: 35px;
  height: 35px;
}
.log-out-button {
  position: relative;
  cursor: pointer;
  text-align: right;
  font-size: 12px;
  color: #999;
}
</style>
