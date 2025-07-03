import { supabase } from "@/lib/supabase.js";

/**
 * Menyimpan soal matematika dasar ke tabel 'soal_matematika_dasar' di Supabase
 *
 * @param {string} soalText - Teks soal, misalnya: "Ingat cara menulis angka 7"
 * @param {string|number} angka - Angka yang akan diuji (misalnya "7"), akan diubah ke number
 * @param {string} jawaban - Jawaban dari soal dalam bentuk teks (misalnya: "tujuh")
 * @param {string} tipe - Tipe soal, misalnya "play-stroke-angka"
 * @returns {Object|null} - Data soal yang berhasil disimpan, atau null jika terjadi error
 */
export async function insertSoalMatematikaDasar(
  soalText,
  angka,
  jawaban,
  tipe
) {
  // Kirim permintaan insert ke Supabase
  const { data, error } = await supabase
    .from("soal_matematika_dasar") // target tabel
    .insert([
      {
        soal: soalText, // isi soal
        angka: angka !== null && angka !== undefined ? parseInt(angka) : null, // angka dikonversi ke integer
        jawaban: jawaban, // jawaban dalam teks
        tipe: tipe, // tipe soal
      },
    ])
    .select(); // minta data yang baru saja dimasukkan dikembalikan

  // Tangani error jika ada
  if (error) {
    console.error("Insert error:", error);
    return null;
  }

  // Kembalikan data soal yang berhasil dimasukkan
  return data?.[0];
}

/**
 * Menyimpan instance soal matematika untuk user dalam bundle tertentu
 *
 * @param {Object} params
 * @param {string} params.bundleSoalId - UUID bundle soal
 * @param {string} params.userId - UUID user (dari Supabase auth)
 * @param {number} params.noUrut - Nomor urut soal
 * @param {number} params.soalId - ID dari soal_matematika_dasar
 * @param {boolean} params.finished - Apakah sudah selesai
 * @param {boolean} params.hasil - Apakah jawaban benar
 * @param {string} params.answer - Jawaban user
 * @param {Array} params.wrongstroke - Array stroke yang salah
 */
export async function insertDisplaySoalMatematikaDasar({
  bundleSoalId,
  userId,
  noUrut,
  soalId,
  finished = false,
  hasil = null,
  answer = "",
  wrongstroke = [],
}) {
  const { data, error } = await supabase
    .from("display_soal_matematika_dasar")
    .insert([
      {
        bundle_soal_id: bundleSoalId,
        user_id: userId,
        no_urut: noUrut,
        soal_id: soalId,
        finished,
        hasil,
        answer,
        wrongstroke,
      },
    ])
    .select();

  if (error) {
    console.error("Insert display_soal error:", error);
    return null;
  }

  return data?.[0];
}

export async function isBundleSudahAda(userId, bundleSoalId) {
  const { data, error } = await supabase
    .from("display_soal_matematika_dasar")
    .select("id")
    .eq("user_id", userId)
    .eq("bundle_soal_id", bundleSoalId)
    .maybeSingle(); // hanya ambil satu data jika ada

  if (error) {
    console.error("Error saat cek bundle:", error);
    return false;
  }

  return data !== null;
}

export async function getBundleUserData(userId, bundleSoalId) {
  const { data, error } = await supabase
    .from("display_soal_matematika_dasar")
    .select(
      `
        id,
        no_urut,
        finished,
        hasil,
        wrongstroke,
        soal_matematika_dasar (
          id,
          soal,
          angka,
          jawaban,
          tipe
        )
      `
    )
    .eq("user_id", userId)
    .eq("bundle_soal_id", bundleSoalId)
    .order("no_urut", { ascending: true });

  if (error) {
    console.error("❌ Gagal mengambil soal:", error);
    return []; // error = return array kosong
  }

  const data_soal = data.map((item) => ({
    id: item.id,
    no_urut: item.no_urut,
    finished: item.finished,
    hasil: item.hasil,
    wrongstroke: item.wrongstroke,
    soal: {
      id: item.soal_matematika_dasar.id,
      soal: item.soal_matematika_dasar.soal,
      angka: item.soal_matematika_dasar.angka,
      jawaban: item.soal_matematika_dasar.jawaban,
      tipe: item.soal_matematika_dasar.tipe,
    },
  }));

  return data_soal;
}

/**
 * Simpan soal matematika dasar secara atomic menggunakan RPC Supabase
 *
 * @param {Array} dataSoal - Array soal: { nomor, tipe, soal, angka, jawaban, path }
 * @param {string} userId - UUID user
 * @param {string} bundleSoalId - UUID bundle soal
 * @returns {boolean} - True jika sukses, false jika gagal
 */
export async function simpanSoal(dataSoal, userId, bundleSoalId) {
  if (!userId || !bundleSoalId) {
    console.error("User ID atau Bundle Soal ID tidak tersedia.");
    return false;
  }

  if (!Array.isArray(dataSoal) || dataSoal.length === 0) {
    console.error("Data soal kosong atau bukan array.");
    return false;
  }

  const soalDataSiapKirim = dataSoal.map((item) => ({
    nomor: item.nomor,
    tipe: item.tipe,
    soal: item.soal,
    angka: item.angka ?? null,
    jawaban: item.jawaban ?? null,
  }));

  const { error } = await supabase.rpc("insert_bundle_soal", {
    p_user_id: userId,
    p_bundle_id: bundleSoalId,
    p_data: soalDataSiapKirim,
  });

  if (error) {
    console.error("❌ Gagal menyimpan bundle soal secara atomic:", error);
    return false;
  }

  console.log("✅ Semua soal berhasil disimpan secara atomic.");
  return true;
}
