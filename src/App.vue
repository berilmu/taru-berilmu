<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

onMounted(() => {
  auth.fetchUserAndProfile();
});
// console.log("Token:", await supabase.auth.getSession());
</script>

<script>
import Loading from "./components/Loading.vue";
import { useLessonStore } from "./stores/LessonStore";

export default {
  components: {
    Loading,
  },
  computed: {
    isLoading() {
      return useLessonStore().isLoading;
    },
  },
};
</script>

<template>
  <transition name="fade" mode="out-in">
    <Loading v-if="isLoading" />
  </transition>
  <RouterView />
</template>

<style>
.main-bg-col {
  background: linear-gradient(to right, black, #18175f, #3533cb);
}
.main-color {
  color: #141361;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
