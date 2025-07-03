import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Materi from "../views/Materi.vue";
import DetailLesson from "../views/levelDetail.vue";
import scrollBehavior from "../service/scrollBehavior";
import ShowMateri from "../views/SoalMateri.vue";
import ShowDetail from "../views/PartitionLevelDetail.vue";
import { useLoadingStore } from "../stores/LoadingStore";

const routes = [
  {
    path: "/",
    redirect: "/math", // default ke Bmatematika
    meta: { requiresAuth: true },
  },
  {
    path: "/:mapel", // path dinamis seperti /barab, /baing, dll
    name: "materi",
    component: Materi,
    meta: { requiresAuth: true },
  },
  {
    path: "/:mapel/detail/:slugmateri/:id",
    name: "materiDetail",
    component: DetailLesson,
    meta: { requiresAuth: true },
  },
  {
    path: "/:mapel/show/:id",
    name: "showMateri",
    component: ShowMateri,
    meta: { requiresAuth: true },
  },
  {
    path: "/:mapel/d/:id",
    name: "showDetail",
    component: ShowDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/canvas",
    name: "canvas",
    component: () => import("../views/CanvasView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/login", component: () => import("@/views/auth/LoginPage.vue") },
  {
    path: "/signup",
    component: () => import("@/views/auth/SignupPage.vue"),
  },
  {
    path: "/email-verification",
    name: "emailVerification",
    component: () => import("@/views/auth/VerificationSent.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "catchAll",
    component: () => import("@/views/auth/VerifiedEmail.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/auth/Logout.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  console.log("Current user:", auth.user);
  if (!auth.user) await auth.fetchUserAndProfile();

  if (to.meta.requiresAuth && !auth.user) {
    return next("/login");
  }

  // Jika user sudah login, dan mencoba akses login/signup
  if (auth.user && (to.path === "/login" || to.path === "/signup")) {
    return next("/");
  }

  // loading
  const loadingStore = useLoadingStore();
  loadingStore.startLoading(); // Tampilkan loading

  next();
});

router.afterEach(() => {
  const loadingStore = useLoadingStore();
  loadingStore.stopLoading(); // Sembunyikan loading setelah navigasi selesai
});

export default router;
// save
