<script setup>
defineProps({
  id: String,
  judul: String,
  deskripsi: String,
  status: String,
  progres: Number,
  gambar: String,
  slug: String,
});

// ambil data di router
import { useRoute } from "vue-router";
const route = useRoute();
const mapel = route.params.mapel;
</script>

<template>
  <div class="cover">
    <div class="card">
      <RouterLink
        :to="{
          path: `/${mapel}/detail/${slug}/${id}`,
          state: {
            id: 1,
          },
        }"
        class="card-body text-decoration-none"
      >
        <div class="navbar-brand rounded-circle child1a child" href="#">
          <img
            :src="gambar || '/img/barab/leveldetail/IQRA-6-full-512.jpg'"
            alt="Bootstrap"
            width="100%"
            height="100%"
          />
        </div>
        <div class="child2a">
          <div class="child1b">
            <div class="keterangan-materi">
              <h1 class="judul-materi">{{ judul }}</h1>
              <p class="penjelasan-materi">{{ deskripsi }}</p>
            </div>
            <div class="status-materi d-flex">
              <div class="statbox1">status</div>
              <div
                :class="[
                  progres === 100
                    ? 'persentase100 main-bg-col'
                    : progres === 0
                    ? 'persentase0'
                    : 'persentaseTanggung',
                  'statbox2 main-bg-col',
                ]"
              >
                {{
                  progres === 100
                    ? "finish"
                    : progres === 0
                    ? "not started"
                    : "ongoing"
                }}
              </div>
            </div>
          </div>
          <div class="child2b dflex">
            <div
              :class="[
                progres === 100
                  ? 'main-color'
                  : progres === 0
                  ? 'love0'
                  : 'loveT',
                'love',
              ]"
            >
              <i class="bi bi-heart-fill"></i>
            </div>
            <div
              :class="[
                progres == 100
                  ? 'persentase100 main-bg-col'
                  : progres == 0
                  ? 'persentase0'
                  : 'persentaseTanggung',
                'mt-auto',
                'persentase',
              ]"
            >
              {{ progres }}%
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* kotak materi */
.card {
  margin: 1rem;
  padding: 0;
  --bs-card-spacer-y: 0;
  --bs-card-spacer-x: 0;
  background-color: #fff4e2;
  border-radius: 1.3rem;
  overflow: hidden;
}
@media (min-width: 650px) {
  .cover {
    display: flex;
    justify-content: space-around;
  }
  .card {
    width: 650px;
  }
}
.card-body {
  justify-content: space-between;
  display: flex;
}

/* isi kotak materi: gambar */
.child1a {
  border-radius: 100%;
  width: 5rem;
  height: 5rem;
}

/* isi kotak materi: 2bagian */
.child2a,
.child1b {
  display: flex;
}
.child2a {
  flex: 1;
  width: 20%;
  padding: 0.3rem 0 0.3rem 0;
}
.child1b {
  /* background-color: blue; */
  flex: 2;
  width: 80%;
  padding-left: 0.5rem;
  flex-direction: column;
}

/* materi kiri */
.keterangan-materi {
  max-height: 3rem;
  overflow: hidden;
}
/* text materi */
.progress-materi,
.judul-materi {
  margin: 0;
  padding: 0;
}
.judul-materi {
  font-size: 1rem;
}
.penjelasan-materi {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.progress-materi {
  font-size: 0.6rem;
}

/* progress materi */
.status-materi {
  margin-top: auto;
}
.statbox1 {
  width: 3rem;
}
.statbox2 {
  width: 4.3rem;
}
.statbox1,
.statbox2,
.persentase {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  font-size: 0.8rem;
  text-align: center;
  border-radius: 0.5rem;
}
.statbox1 {
  background-color: white;
  margin-right: 0.3rem;
}
.statbox2 {
  color: white;
}

/* materi kanan */
.child2b {
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.love {
  font-size: 2rem;
}
.loveT {
  color: #747373;
}
.love0 {
  color: rgb(216, 214, 214);
}
.persentase {
  width: 3rem;
}
.persentase100 {
  color: white;
}
.persentase0 {
  background: linear-gradient(to right, rgb(216, 214, 214), #fdfdfd, #ffffff);
  color: rgb(0, 0, 0);
}
.persentaseTanggung {
  background: linear-gradient(to right, rgb(15, 15, 15), #747373, #ffffff);
  color: white;
}
@media (max-width: 350px) {
  .child2b {
    display: none;
  }
}
</style>
