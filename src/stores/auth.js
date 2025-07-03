import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    profile: null,
  }),

  actions: {
    async fetchUserAndProfile() {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      console.log("📦 Session:", sessionData);

      if (!sessionData.session) {
        console.warn("⚠️ No session found, user not logged in.");
        this.user = null;
        this.profile = null;
        return;
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("❌ Error fetching user:", error);
        return;
      }

      this.user = user;
      console.log("✅ Current user:", user);

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("❌ Error fetching profile:", profileError);
        } else {
          this.profile = profile;
        }
      }
    },

    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await this.fetchUserAndProfile();
    },

    async logout() {
      await supabase.auth.signOut();
      this.user = null;
      this.profile = null;
    },

    async signup(email, password, role = "user") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error; // Handle error jika signup gagal

      const user = data.user;

      // Insert profil meskipun belum login (email belum diverifikasi)
      if (user) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id, // ID sudah ada karena Supabase memberikan user ID
            email: user.email,
            role,
            created_at: new Date().toISOString(), // Gunakan ISO string format
          },
        ]);

        if (insertError) throw insertError; // Handle error saat insert profil
      }

      // Kalau ada session (berarti login otomatis), fetch user+profile
      if (data.session) {
        await this.fetchUserAndProfile();
      } else {
        // Jika tidak ada session, user hanya mendaftar dan harus verifikasi email dulu
        console.log("User has been signed up but needs email verification.");
      }

      return data; // Return data signup yang berisi user dan session (jika ada)
    },
  },
});
