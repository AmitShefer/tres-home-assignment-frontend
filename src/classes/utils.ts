import store from "@/store";
import router, { RouteName } from "@/router";

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "access_token";

export const getAccessToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || null;
};

export const storeAccessToken = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
};

export const isLoggedIn = (): boolean => {
  return !!getAccessToken();
};

export const logOut = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  store.commit("setCurrentUser", null);
  router.push({ name: RouteName.LogIn });
};
