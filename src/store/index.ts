import { createStore } from "vuex";
import { UserModel } from "@/classes/types";
import { callRequest, GET } from "@/classes/network-caller";

declare interface StateModel {
  currentUser: UserModel | null;
}

export default createStore({
  state: {
    currentUser: null,
  },
  getters: {},
  mutations: {
    setCurrentUser(state: StateModel, user: UserModel) {
      state.currentUser = user;
    },
  },
  actions: {
    fetchCurrentUser({ commit }) {
      callRequest<UserModel>({
        method: GET,
        api: "/v1/users/1",
      }).then((response) => {
        commit("setCurrentUser", response.data);
      });
    },
  },
  modules: {},
});
