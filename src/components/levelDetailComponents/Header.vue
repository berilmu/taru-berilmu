<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  judul: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

function goBack() {
  router.go(-1);
}
</script>

<template>
  <header
    class="navbar custom-gradient d-flex justify-content-between align-items-center shadow"
  >
    <div class="row" style="width: 102%">
      <a
        href="#"
        class="col-2 navbar-brand main-color"
        @click="goBack"
        style="font-weight: bold"
        ><i class="bi bi-arrow-bar-left main-color" style="margin: 0"></i>III
      </a>
      <div
        class="col-8 navbar-brand d-flex justify-content-center align-items-center"
        style="overflow: hidden"
      >
        <span style="width: 10%" class="main-color">
          <i class="bi bi-geo-alt-fill"></i
        ></span>
        <span
          style="
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          "
          :title="judul.judul + ' : ' + judul.deskripsi"
        >
          {{ judul.judul }} : {{ judul.deskripsi }}</span
        >
      </div>

      <div
        class="col-2 d-flex justify-content-end align-items-center main-color"
      >
        <!-- Button trigger modal -->
        <i class="bi bi-gear-wide-connected"></i>
      </div>
    </div>
  </header>
</template>

<style scoped>
.row {
  --bs-navbar-brand-margin-end: 0;
}
.main-color {
  padding-top: var(--bs-navbar-brand-padding-y);
  padding-bottom: var(--bs-navbar-brand-padding-y);
  margin-right: var(--bs-navbar-brand-margin-end);
  font-size: var(--bs-navbar-brand-font-size);
  text-decoration: none;
  white-space: nowrap;
}
.main-color:hover {
  color: rgb(135, 139, 139);
}
header {
  --bs-navbar-padding-y: 0;
  --bs-navbar-padding-x: 0;
  --bs-navbar-brand-padding-y: 0.1rem;
}
</style>
