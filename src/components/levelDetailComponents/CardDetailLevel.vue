<template>
  <div class="card shadow mt-2 isimateri">
    <div class="card-body d-flex wrapper">
      <div class="left">
        <div class="gbr">
          <img :src="gambar" alt="cover" />
        </div>
      </div>
      <div class="right d-flex flex-column">
        <div class="atas flex-grow-1">
          <h1>{{ judul }}</h1>
          <p>{{ deskripsi }}</p>
        </div>
        <div class="bawah d-flex justify-content-between">
          <span>{{ progres }}/100</span>
          <div class="pelajari main-bg-col">pelajari</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  judul: String,
  deskripsi: String,
  progres: Number,
  gambar: String,
  lastgroup: Boolean,
});
</script>

<style scoped>
h1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card {
  --bs-card-spacer-y: 0.5rem;
  --bs-card-spacer-x: 0.5rem;
}
.isimateri {
  border-radius: 1rem;
}
.isimateri .left {
  width: 50%;
  margin-right: 0.5rem;
  max-width: 10rem;
  /* min-height: 100%; */
  min-height: 5rem;
}
@media (min-width: 380px) {
  .isimateri .left {
    width: 30%;
  }
}
.isimateri .left .gbr {
  width: 100%;
  height: 100%;
  max-height: 7rem;
  overflow: hidden;
  border-radius: 1rem;
  background: rgb(255, 255, 255);
}
.gbr img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.isimateri .right {
  width: 80%;
  max-height: 7rem;
}
.right .atas {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Ganti angka 3 sesuai jumlah baris yang kamu mau */
  -webkit-box-orient: vertical;

  /* Tambahan untuk dukungan standar modern */
  line-clamp: 3;
  box-orient: vertical;
}
.atas h1 {
  font-size: 1rem;
  margin-bottom: 0;
}
.atas p {
  font-size: 0.8rem;
}
.bawah span {
  color: rgb(255, 65, 40);
}
.bawah .pelajari {
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  color: ghostwhite;
}
</style>
