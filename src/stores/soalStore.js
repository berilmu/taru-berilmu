import { defineStore } from "pinia";

export const useSoalStore = defineStore("soal", {
  state: () => ({
    id: "",
    soal: [],
    lastIndex: 0,
    jawabanUser: {},
  }),

  getters: {
    getSoalByNomor: (state) => (nomor) => {
      return state.soal.filter((item) => item.nomor === nomor);
    },
    getJawabanUser: (state) => (nomor) => {
      return state.jawabanUser[nomor] || null;
    },
    jumlahSoalUnik: (state) => {
      const unik = new Set(state.soal.map((item) => item.nomor));
      return unik.size;
    },
    getSemuaSoal: (state) => {
      return state.soal;
    },
    getSemuaJawabanUser: (state) => {
      return state.jawabanUser;
    },
    getId: (state) => {
      return state.id;
    },
    getIndex: (state) => {
      return state.lastIndex;
    },
    isSemuaJawabanLengkap() {
      const semuaNomorSoal = this.soal.map((item) => item.nomor);
      const semuaSudahDijawab = semuaNomorSoal.every(
        (nomor) => nomor in this.jawabanUser
      );

      return semuaSudahDijawab;
    },
  },

  actions: {
    setJawabanUser(nomor, jawaban) {
      const soalExist = this.soal.some((item) => item.nomor === nomor);
      const isValid =
        typeof jawaban === "string" ||
        (typeof jawaban === "object" && jawaban !== null);

      if (!soalExist) {
        console.error(`Nomor soal ${nomor} tidak ditemukan.`);
        return;
      }

      if (!isValid) {
        console.error(`Struktur jawaban untuk nomor ${nomor} tidak valid.`);
        return;
      }

      this.jawabanUser[nomor] = jawaban;
    },
    updateJawabanUserPartial(nomor, perubahan) {
      if (!this.jawabanUser[nomor]) {
        console.error(`Jawaban untuk nomor ${nomor} tidak ditemukan.`);
        return;
      }

      if (typeof perubahan !== "object" || perubahan === null) {
        console.error(`Perubahan untuk nomor ${nomor} harus berupa objek.`);
        return;
      }

      this.jawabanUser[nomor] = {
        ...this.jawabanUser[nomor],
        ...perubahan,
      };
    },
    resetJawabanUser() {
      this.jawabanUser = {};
    },

    IsAdaSoal() {
      return this.soal.length > 0;
    },

    tambahSoal(soalBaru) {
      if (
        !soalBaru ||
        typeof soalBaru !== "object" ||
        soalBaru.nomor === undefined
      ) {
        console.error("Format soal tidak valid:", soalBaru);
        return;
      }

      const sudahAda = this.soal.some((s) => s.nomor === soalBaru.nomor);
      if (sudahAda) {
        console.warn(
          `Soal dengan nomor ${soalBaru.nomor} sudah ada, tidak ditambahkan ulang.`
        );
        return;
      }

      this.soal.push(soalBaru);
    },

    tambahBanyakSoal(daftarSoal) {
      if (!Array.isArray(daftarSoal)) {
        console.error("Input harus berupa array.");
        return;
      }

      daftarSoal.forEach((soal) => {
        this.tambahSoal(soal);
      });
    },

    // ✅ Ganti seluruh soal dan atur ulang nomor
    gantiSemuaSoal(daftarSoal) {
      if (!Array.isArray(daftarSoal)) {
        console.error("Input harus berupa array.");
        return;
      }

      this.soal = daftarSoal.map((soal, index) => ({
        ...soal,
        nomor: index + 1,
      }));

      // Reset jawaban juga karena soal berubah
      this.resetJawabanUser();
    },

    // ✅ Set ID soal
    setId(idBaru) {
      if (typeof idBaru !== "string" || idBaru.trim() === "") {
        console.error("ID harus berupa string yang valid.");
        return;
      }
      this.id = idBaru;
    },

    // ✅ Ambil ID (alternatif ke getter getId)
    ambilId() {
      return this.id;
    },
    setIndex(indexnya) {
      this.lastIndex = indexnya;
    },
  },
});
