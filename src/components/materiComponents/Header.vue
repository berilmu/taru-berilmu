<script setup>
import { ref, toRef, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import Menu from "../navComponents/MenuPelajaran.vue";

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

// --- Scroll Tracking ---
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>
<template>
  <header
    :class="[
      'navbar main-bg-col main-bg-col shadow',
      { scrolled: isScrolled, normal: !isScrolled },
      { stickyHeader: isScrolled, blockedHeader: !isScrolled },
    ]"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <a
        :class="[
          'navbar-brand rounded-circle',
          { hide: isScrolled, nohide: !isScrolled },
        ]"
        href="#"
        style="
          background-color: white;
          width: 50px;
          height: 50px;
          padding: 0;
          overflow: hidden;
        "
      >
        <transition name="fade" mode="out-in">
          <img
            :src="currentImage"
            :key="currentImage"
            alt="Logo Mapel"
            width="100%"
            height="100%"
          />
        </transition>
      </a>
      <div class="nav justify-content-center text-white logofont">
        <span v-for="(item, index) in mapelList" :key="index">
          <span v-if="path == item.path">{{ item.app }}</span>
        </span>
      </div>
      <div :class="['menu', { hide: isScrolled, nohide: !isScrolled }]">
        <Menu :mapelList="mapelList" />
      </div>
      <div
        :class="{ nohide: isScrolled, hide: !isScrolled }"
        @click="scrollToTop"
      >
        <div class="top">
          <i class="bi bi-arrow-bar-up"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Normal state */
.normal {
  padding: 1rem 1.5rem; /* Sama dengan py-3 px-4 */
  transition: all 0.3s ease;
}

/* Setelah scroll */
.scrolled {
  padding: 0; /* Mengecil setelah scroll */
  background: linear-gradient(
    to right,
    black,
    #000046,
    #1cb5e0
  ); /* Optional: gradient berubah */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.hide {
  display: none;
}
.nohide {
  display: block;
}
.stickyHeader {
  position: sticky;
  top: 0;
  z-index: 100;
}
.blockedHeader {
  display: block;
}

/* Font */
.logofont {
  font-family: "woblofont", sans-serif;
  font-size: 2rem;
}

@font-face {
  font-family: "woblofont";
  src: url("../../assets/fonts/logo-font/super-woobly-font/SuperWoobly-8MJlz.ttf")
    format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* Menu style */
.menu {
  color: aliceblue;
}
.menu:hover {
  color: #b56e3f;
}
.top {
  color: rgb(18, 4, 99);
  font-size: large;
  font-weight: bolder;
  background: rgb(255, 255, 255);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top:hover {
  color: #b56e3f;
}
</style>
