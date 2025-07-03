<template>
  <div class="bottom-nav container">
    <div class="nav-inner d-flex align-items-center main-bg-col">
      <div class="btn btn-link main-color dua">
        <span class="home-hole"> {{ text }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>
<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-items: center;
}

.nav-inner {
  border-radius: 1rem;
  height: 2.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 700px;
}

.nav-inner .dua {
  padding: 3rem;
}

.home-hole {
  font-size: 1.5rem;
  text-decoration: none;
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
