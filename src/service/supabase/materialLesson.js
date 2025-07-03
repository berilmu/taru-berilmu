// src/supabase/materialLesson.js
import { supabase } from "@/lib/supabase.js";

export async function getMaterialLessonByLessonId(lessonId) {
  const { data, error } = await supabase
    .from("materiallesson")
    .select("*")
    .eq("lessons_id", lessonId)
    .order("order", { ascending: true });

  if (error) throw error;
  return data;
}
