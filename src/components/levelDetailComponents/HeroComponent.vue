<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="card card-bg-image"
    :style="{
      backgroundImage: `url(${
        data.gambar || '/img/barab/leveldetail/IQRA-6-full-512.jpg'
      })`,
    }"
  >
    <div class="card-overlay">
      <h5 class="card-title">{{ data.judul }}</h5>
      <p class="card-text">{{ data.deskripsi }}</p>
    </div>
  </div>
</template>

<style scoped>
.card100 {
  width: 100%;
}
.card-bg-image {
  position: relative;
  /* background-image: url("/img/barab/leveldetail/iqra2.jpeg"); */
  background-size: cover;
  background-position: center;
  min-height: 13rem;
  color: white;
  border: none;
  border-radius: 15px;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* transparansi 50% */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.card-text {
  font-size: 1rem;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
