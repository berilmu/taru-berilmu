<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header
    class="navbar main-bg-col px-0 py-3 d-flex justify-content-between align-items-center sticky-header shadow"
  >
    <div class="container">
      <div class="nav justify-content-center text-white logofont">
        {{ title }}
      </div>
      <div class="menu"></div>
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
