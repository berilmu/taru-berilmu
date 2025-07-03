<template>
  <Header title="Verifikasi Email" />
  <div class="p-4 max-w-md mx-auto">
    <p class="mb-2">
      Kami telah memverifikasi email Anda. Silakan kembali login ke aplikasi dan
      eksplorasi segala hal yang anda nikmati dalam aplikasi/website kami.
    </p>
    <p>Terimakasih</p>
    <div>
      <router-link to="/login" class="btn main-bg-col text-white w-full">
        Login
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "@/components/auth/Header.vue";
const router = useRouter();
const route = useRoute();
onMounted(() => {
  // Ambil bagian setelah "/"
  const fullPath = route.fullPath; // misalnya "/access_token=abc&refresh_token=xyz&type=signup"

  if (fullPath.startsWith("/access_token=")) {
    const rawQuery = fullPath.substring(1); // buang tanda "/"
    const queryParams = Object.fromEntries(new URLSearchParams(rawQuery));

    // Contoh akses:
    const accessToken = queryParams.access_token;
    const refreshToken = queryParams.refresh_token;
    const type = queryParams.type;

    console.log("Parsed token:", accessToken);
    // Kamu bisa langsung panggil supabase.auth.setSession() dll. di sini
  } else {
    // Redirect ke 404 atau halaman lain jika bukan pattern yang diinginkan
    router.replace("/404");
  }
});
</script>
