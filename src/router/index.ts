import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Transactions from "@/pages/transactions/Transactions.vue";
import LogIn from "@/pages/log-in/LogIn.vue";
import { getAccessToken, isLoggedIn } from "@/classes/utils";

export enum RouteName {
  Transactions = "transactions",
  LogIn = "log-in",
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RouteName.Transactions,
    component: Transactions,
    meta: { requiresAuth: true },
  },
  {
    path: "/log-in",
    name: RouteName.LogIn,
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (to.name === RouteName.LogIn && isLoggedIn()) {
    next({ name: RouteName.Transactions });
  } else if (requiresAuth && !isLoggedIn()) {
    next({ name: RouteName.LogIn });
  } else {
    next();
  }
});

export default router;
