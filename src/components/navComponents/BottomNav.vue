<!-- BottomNav.vue -->
<script setup>
const props = defineProps({
  home: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="bottom-nav container">
    <div class="nav-inner d-flex align-items-center main-bg-col">
      <button class="btn btn-link text-white satu">
        <i class="bi bi-heart-fill"></i> <i class="bi bi-cursor-text"></i>
      </button>
      <router-link class="btn btn-link main-color dua" :to="`/${home}`">
        <span class="home-hole">
          <i class="bi bi-house-fill"></i>
        </span>
      </router-link>
      <button class="btn btn-link text-white tiga">
        <i class="bi bi-cursor-text"></i> <i class="bi bi-person-fill"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-inner {
  border-radius: 1rem;
  height: 2.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.nav-inner .satu,
.nav-inner .tiga {
  flex: 1;
}
.nav-inner .dua {
  flex: 2;
}

.satu,
.dua,
.tiga {
  text-decoration: none;
  font-size: 1.5rem;
}
.home-hole {
  padding: 0.05rem 1.5rem 0.05rem 1.5rem;
  background-color: white;
  border-radius: 2rem;
}
@media (max-width: 336px) {
  .satu,
  .dua,
  .tiga {
    font-size: 1rem;
  }
  .home-hole {
    padding: 0.08rem 1.5rem 0.08rem 1.5rem;
  }
}
@media (max-width: 262px) {
  .satu,
  .dua,
  .tiga {
    font-size: 0.5rem;
  }
  .home-hole {
    padding: 0.1rem 1.5rem 0.1rem 1.5rem;
  }
}
@media (max-width: 191px) {
  .satu,
  .dua,
  .tiga {
    font-size: 0.3rem;
  }
}
</style>
