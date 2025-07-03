// src/services/fetchLessons.js
import { supabase } from "@/lib/supabase.js";
import { useLessonStore } from "@/stores/LessonStore.js";

export async function loadLessonsFromSupabase() {
  const store = useLessonStore();
  store.setLoading(true);

  try {
    // ambil daftar pelajaran beserta mapel-nya (join)
    const { data, error } = await supabase
      .from("lessons")
      .select(
        "id, title, description, progress, subject_id, order, slug, image_url, logo_url, mapel (id, nama_mapel, path, nama_app, img)"
      );
    // console.log("ini datanya", data);

    if (error) {
      throw error;
    }

    // bentuk ulang data supaya cocok dengan bentuk lessonStore kamu
    const grouped = {};

    data.forEach((lesson) => {
      const { mapel } = lesson;

      if (!grouped[mapel.path]) {
        grouped[mapel.path] = {
          mapel: mapel.nama_mapel,
          path: mapel.path,
          app: mapel.nama_app,
          img: mapel.img,
          levels: [],
        };
      }

      grouped[mapel.path].levels.push({
        id: lesson.id,
        judul: lesson.title,
        deskripsi: lesson.description,
        progress: lesson.progress,
        slug: lesson.slug,
        gambar: lesson.image_url,
        logo: lesson.logo_url,
        urutan: lesson.order,
      });
      // sort tiap level di dalam grouped
      Object.values(grouped).forEach((group) => {
        group.levels.sort((a, b) => a.urutan - b.urutan);
      });
    });

    // Ubah dari objek ke array
    const result = Object.values(grouped);
    // console.log("ini hasilnya", result);

    store.setLessons(result);
  } catch (err) {
    console.error("❌ Gagal mengambil data dari Supabase:", err.message);
    store.setError("Gagal mengambil data dari Supabase");
  } finally {
    store.setLoading(false);
  }
}
