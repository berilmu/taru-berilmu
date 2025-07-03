<template>
  <Header title="Daftar" />

  <div class="p-4 w-100 mx-auto ji-c">
    <form @submit.prevent="onSignup">
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
      <button
        class="btn w-100 main-bg-col text-white d-flex align-items-center justify-content-center"
        :disabled="loading"
      >
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm me-2"
          role="status"
        />
        {{ loading ? "Mendaftar..." : "Sign Up" }}
      </button>
    </form>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    <div class="mt-2">
      Sudah punya akun?
      <router-link
        to="/login"
        class="block mt-4 text-sm text-primary text-center"
        >Login di sini
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
import { supabase } from "@/lib/supabase"; // pastikan ini file koneksi kamu
import Header from "@/components/auth/Header.vue";

const loading = ref(false);
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const onSignup = async () => {
  error.value = "";
  loading.value = true;

  const redirectUrl = import.meta.env.VITE_SUPABASE_EMAIL_VERIF;

  try {
    const { data, error: signupError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (signupError) throw signupError;

    router.push(`/email-verification?email=${encodeURIComponent(email.value)}`);
  } catch (err) {
    error.value = err.message || "Gagal mendaftar.";
  } finally {
    loading.value = false;
  }
};
</script>
