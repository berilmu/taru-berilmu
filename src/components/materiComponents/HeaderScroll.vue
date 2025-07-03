<script setup>
import { computed, toRef } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  mapelList: {
    type: Array,
    required: true,
  },
});

const mapelList = toRef(props, "mapelList");
console.log("mapel list", mapelList.value);

const route = useRoute();
const path = computed(() => route.path.split("/").pop());
console.log("path", path.value);

const currentImage = computed(() => {
  const found = mapelList.value.find((item) => item.path === path.value);
  return found ? found.img : "/sekolah-bebas/img/default.png"; // fallback kalau tidak ditemukan
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <header
    class="navbar main-bg-col px-0 py-0 d-flex justify-content-between align-items-center sticky-header shadow"
  >
    <div class="container">
      <div class="nav justify-content-center text-white logofont">
        <span v-for="(item, index) in mapelList" :key="index"
          ><span v-if="path == item.path">{{ item.app }}</span></span
        >
      </div>
      <div class="menu" @click="scrollToTop">
        <i class="bi bi-arrow-bar-up"></i>
      </div>
    </div>
  </header>
</template>

<style scoped>
.logofont {
  font-family: "woblofont", sans-serif;
  font-size: 1rem;
}
@font-face {
  font-family: "woblofont";
  src: url("../../assets/fonts/logo-font/super-woobly-font/SuperWoobly-8MJlz.ttf")
    format("truetype");
  font-weight: normal;
  font-style: normal;
}

.menu {
  color: aliceblue;
}
/* Saat di-hover */
.menu:hover {
  color: #b56e3f;
}

/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
