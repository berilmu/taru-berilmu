<template>
  <Header title="Login" />
  <div class="p-4 w-100 mx-auto ji-c">
    <form @submit.prevent="onLogin">
      <div class="mt-2 w-100">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input mb-2 w-100"
        />
      </div>
      <div class="mt-1 w-100">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input mb-2 w-100"
        />
      </div>

      <button class="btn w-100 main-bg-col text-white" :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    <div class="mt-2">
      Tidak punya akun?
      <router-link
        to="/signup"
        class="block mt-4 text-sm text-primary text-center"
        >Daftar di sini
      </router-link>
    </div>
  </div>
</template>

<style scoped>
header {
  height: 10%;
  max-height: 5rem;
  min-height: 2rem;
}
.ji-c {
  justify-items: center;
  height: 90%;
}
form {
  width: 80%;
  max-width: 500px;
  min-width: 200px;
}
</style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Header from "@/components/auth/Header.vue";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();
const isLoading = ref(false);

const onLogin = async () => {
  error.value = "";
  isLoading.value = true;

  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (err) {
    if (
      err.message.includes("Email not confirmed") ||
      err.message.includes("email not confirmed")
    ) {
      router.push(
        `/email-verification?email=${encodeURIComponent(email.value)}`
      );
    } else {
      error.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
