<!-- src/views/Logout.vue -->
<template>
  <div class="cover">
    <div class="p-4 text-center">
      <p>Sedang logout...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  await auth.logout();
  router.replace("/login");
});
</script>

<style scoped>
.cover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
