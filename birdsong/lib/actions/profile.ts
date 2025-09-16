"use server";

import { UserProfile } from "@/app/profile/page";
import { createClient } from "../supabase/server";

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return profile;
}

export async function updateUserProfile(profileData: Partial<UserProfile>) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: "User not authenticated" };

  const updatePayload = {
    ...profileData,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("users")
    .update(updatePayload)
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function uploadProfilePhoto(file: File) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: "User not authenticated" };

  const fileExt = file.name.split(".").pop();
  const fileName = `profile-photos/${user.id}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("profile-photos")
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (error) return { success: false, error: error.message };

  const { data: { publicUrl } } = supabase.storage.from("profile-photos").getPublicUrl(fileName);
  return { success: true, url: publicUrl };
}
