<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";

// components
import Header from "../components/soalmateri/header/Header.vue";
import PathEssayQuestion from "../components/soalmateri/PathEssayQuestion.vue";
import AngkaStrokeWriter from "../components/soalmateri/AngkaStrokeWriter.vue";
import NextButton from "../components/soalmateri/NextButton.vue"; // Tombol Next
import StrokePlayAngka from "@/components/soalmateri/StrokePlayAngka.vue";

// service
import getSpecialMathData from "../service/soal/getSpecialMathData";
import {
  transformSoalData,
  transformJawabanData,
} from "../service/soalMathFunct";
import {
  getBundleUserData,
  simpanSoal,
} from "@/service/supabase/soalMatematika";

// store
import { useSoalStore } from "@/stores/soalStore";
import { useAuthStore } from "@/stores/auth";
const soalStore = useSoalStore();

// pengaturan route
const route = useRoute();
const router = useRouter();

// data data dari route
const path = computed(() => route.path.split("/").pop() || "");
// console.log("📍 Path dari URL:", idSoal);

function goBack() {
  soalStore.setIndex(0); // ganti index terakhir di storenya jadi 0
  router.go(-1);
}

const dataquery = JSON.parse(route.query.needData || "null");

// data-data mengenai soal
const idSoal = route.params.id;
const jumlahSoal = ref(0);
const dataSoal = ref([]); // data semua soalnya (jika di generate)
const dataJawaban = ref([]); // data semua soalnya (jika di generate)
const currentSoal = ref({}); // data semua soalnya (jika di generate)
const currentSoalIndex = ref(0); // Menyimpan nomor soal aktif
const isAnswered = ref(false); // Menyimpan status apakah soal sudah dijawab
const currenAnswer = ref([]);

onMounted(async () => {
  // get id user ------------------------
  const auth = useAuthStore();
  await auth.fetchUserAndProfile(); // memastikan data user dan profile terisi

  const userId = auth.user?.id;
  // ------------------------------------

  // cek dulu apakah ada soal di store
  if (!soalStore.IsAdaSoal()) {
    // jika masuk sini berati tidak ada

    const soAlFrmDatabase = await getBundleUserData(userId, idSoal);
    if (soAlFrmDatabase.length > 0) {
      // jika ada masuk sini
      dataSoal.value = transformSoalData(soAlFrmDatabase); // data soalnya diisi ini
      soalStore.setId(idSoal);
      // data jawabannya diisi
      dataJawaban.value = transformJawabanData(soAlFrmDatabase);
    } else {
      if (dataquery != null) {
        // cek apakah ini ada nilai data query khusus
        // jika masuk sini berarti ada
        soalStore.setId(idSoal); // tambahkan id soal ke store
        dataSoal.value = getSpecialMathData(dataquery); // Generate soalnya, menghasilkan soal sesuai tipenya

        // simpan datanya ke database dulu
        const berhasil = await simpanSoal(dataSoal.value, userId, idSoal);

        if (berhasil) {
          console.info("Semua soal berhasil disimpan!");
        } else {
          console.error("Terjadi kesalahan saat menyimpan soal.");
          return;
        }
      }
    }

    soalStore.tambahBanyakSoal(dataSoal.value); // setelah dapat dataSoal simpan ke store
    // simpan data jawaban ke store
    dataJawaban.value.forEach((item) => {
      soalStore.setJawabanUser(item.nomor, item);
    });
    // cek apakah benar benar sudah masuk
    if (soalStore.getSemuaSoal.length > 1) {
      // jika masuk sini berarti soal sudah kesimpan
      // dataSoal.value = soalStore.getSemuaSoal; // ambil data soalnya
      jumlahSoal.value = soalStore.jumlahSoalUnik; // simpan jumlah soalnya
      currentSoal.value = soalStore.getSoalByNomor(
        currentSoalIndex.value + 1
      )[0]; // simpan soal pertama untuk ditampilkan
    }
    currenAnswer.value = soalStore.getJawabanUser(currentSoalIndex.value + 1);
  } else {
    // samakan apakah id soal di route sama dengan yang di store
    console.log("ada soal");

    if (idSoal == soalStore.getId) {
      currentSoalIndex.value = soalStore.getIndex; // index soalnya di gasnti ke soal berikutnya
      // kalau idnya sama tinggal tampilkan soalnya berdasarkan currentIndex yang dikerjakan
      jumlahSoal.value = soalStore.jumlahSoalUnik; // simpan jumlah soalnya
      currentSoal.value = soalStore.getSoalByNomor(soalStore.getIndex + 1)[0];
      console.log(currentSoal.value);
      console.log(currenAnswer.value);
    }
    // isi jawabannya
    currenAnswer.value = soalStore.getJawabanUser(currentSoalIndex.value + 1);

    console.log(soalStore.getSemuaJawabanUser);

    // cek apakah soal sudah selesai dikerjakan
    if (soalStore.isSemuaJawabanLengkap) {
      isAnswered.value = true; // numculkan tombol lanjut/finish
    }
  }
});

/** Logic soal
 * --------------------------------------------------------------
 * Cek apakah user sudah mengerjakan soal ini
 * jika sudah mengerjakan maka ambil datanya masukkan ke store
 * ambil dari store dan tampilkan di halaman
 *---------------------------------------------------------------
 *
 * tiap kali user masuk ke halaman ini
 * [x] cek dulu apakah ada soal di store
 * [x] kalau ada cek apakah soalnya seperti yang dimaksud user (by id bundle soal)
 * [x] jikas iya tampilkan. jika tidak cari soalnya dan ganti (ikuti logika berikutnya)
 *
 * [x] Jika user belum mengerjakan soal
 * [x] cek apakah ini ada nilai data query khusus (berarti soal generate bukan soal yang disimpan di database)
 * [x] Generate soalnya
 * [x] setelah dapat dataSoal simpan ke store
 * [x] ambil lagi, lalu tampilkan ke user (untuk tampilan ke user sudah lancar)(bisa dibuat satu persatu pengambilan soalnyaby number yg dikerjakan, sekarang tidak satu persatu tapi bisa ditampilkan)
 * [x] Tiap kali user mengerjakan satu nomor soal perbarui Jawaban satu-persatu di store
 * [x] Ketika jawaban terakhir sudah selesai user dan jawaban terakhir sudah disimpan maka baru tampilkan Tombol finish
 * Ketika tombol finish ditekan, maka simpan data soal dan jawaban yang ada to store ke database dan catata berdasar id user. (databasenya belum dibuat untuk ini)
 * dengan begitu user dianggap sudah mengerjakan bundle soal ini
 *
 * [x] Jika user belum mengerjakan soal
 * [x] cek apakah ini ada nilai data query khusus, jika tidak ada
 * [x] ambil datanya dari database berdasarkan id bundel soalnya (databasenya belum dibuat untuk ini)
 * [x] setelah dapat data soalnya masukkan ke store
 * [x] panggil lagi dari store untuk ditampilkan ke user (bisa satu persatu, sekarang tidak satu persatu tapi bisa ditampilkan)
 * [x] simpan jawaban user ke store, jika sudah semuanya maka tampilkan tombol finish
 * [x] ketika user menekan tombol finish simpan soal ke database sambil redirect.
 * [x] Jika soal sudah disimpan ke database maka user dianggap sudah mengerjakan soal.
 *
 * antisipasi data jawaban user tidak tersimpan
 * Jika user memencek finish dan data tidak bisa tersimpan di database
 * buat tempat untuk menandai bahwa soal ini belum disimpan.
 * ketika data tidak tersimpan maka update ini menjadi false (atau ketika user masuk buat false jiks tersimpan jadikan true)
 * ketika ada error dari penyimpanan data jawaban user maka beri peringatan
 * ketika datanya masil false di store (berarti belum disimpan) dan user mau buka soal baru beri peringatan bahwa datanya belum disimpan dan buka data yang belum disimpan ini kepada user alih alih data yang diminta
 * ketika user mau keluar peringatkan untuk menyimpan data jawaban
 *
 * user menyimpan jawaban sebelum selesai (future fiture)
 * ketika user mau keluar saat mengerjakan soal kasih opsi mengimpan jawaban
 * ketika disimpan ke database tandai jadi true dipenanda storenya (otomatis buat juga di database)
 */

// Fungsi untuk berpindah ke soal berikutnya
function nextSoal() {
  if (currentSoalIndex.value < jumlahSoal.value - 1) {
    currentSoalIndex.value++; // index soalnya di gasnti ke soal berikutnya
    currenAnswer.value = soalStore.getJawabanUser(currentSoalIndex.value + 1);
    currentSoal.value = soalStore.getSoalByNomor(currentSoalIndex.value + 1)[0]; // soal saat ini diganti soal berikutnya
    soalStore.setIndex(currentSoalIndex.value); // ganti index terakhir di storenya

    // cek apakah soal sudah selesai dikerjakan
    if (soalStore.isSemuaJawabanLengkap) {
      isAnswered.value = true; // numculkan tombol lanjut/finish
    } else {
      isAnswered.value = false; // Reset status jawaban pada soal berikutnya
    }
  }
}

// Fungsi untuk menerima event "answered" dari PathEssayQuestion
function handleAnswered(status) {
  isAnswered.value = status; // Update status isAnswered
}
</script>

<template>
  <div style="height: 15%">
    <Header />
  </div>

  <!-- Menampilkan soal aktif berdasarkan currentSoalIndex -->
  <div v-if="jumlahSoal > 0" style="height: 85%; justify-items: center">
    <!-- Komponen berdasarkan tipe -->
    <PathEssayQuestion
      v-if="currentSoal.tipe === 'esay-singkat-stroke'"
      :question="currentSoal"
      :-nomor-soal="currentSoalIndex + 1"
      :jawaban="currenAnswer"
      @answered="handleAnswered"
    />

    <AngkaStrokeWriter
      v-if="currentSoal.tipe === 'menulis-stroke-angka'"
      :question="currentSoal"
      :-nomor-soal="currentSoalIndex + 1"
      :jawaban="currenAnswer"
      @answered="handleAnswered"
    />

    <StrokePlayAngka
      v-if="currentSoal.tipe === 'play-stroke-angka'"
      :question="currentSoal"
      :-nomor-soal="currentSoalIndex + 1"
      :jawaban="currenAnswer"
      @answered="handleAnswered"
    />
    <!-- Tambah tipe lain jika ada -->
    <!-- <div v-else>
        <p class="text-red-500">Tipe soal belum didukung: {{ currentSoal.tipe }}</p>
      </div> -->
  </div>

  <!-- Tombol Next untuk berpindah soal -->
  <NextButton
    text="Next"
    v-if="isAnswered && !(jumlahSoal - 1 == currentSoalIndex)"
    @click="nextSoal"
    :disabled="currentSoalIndex === jumlahSoal - 1"
  />
  <NextButton
    text="Finish"
    @click="goBack"
    v-else-if="isAnswered && jumlahSoal - 1 == currentSoalIndex"
    :disabled="currentSoalIndex === jumlahSoal - 1"
  />
  <!-- </div> -->
</template>

<style scoped>
/* Tambahan styling jika perlu */
</style>
