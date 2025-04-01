import { supabase } from "./Supabase";

export const checkUserEligibility = async (
  email: string,
  tempPassword: string
) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return {
      success: false,
      reason: "Datenbankfehler",
    };
  }
  if (!user) {
    return { success: false, reason: "Benutzer nicht gefunden" };
  }

  if (user.temp_pw !== tempPassword) {
    return { success: false, reason: "Einmalpasswort ist falsch" };
  }

  if (user.pw_changed) {
    return { success: false, reason: "Passwort wurde bereits geändert" };
  }

  return { success: true, user };
};

export const completeFirstLogin = async (
  email: string,
  newPassword: string
) => {
  const authResult = await supabase.auth.signUp({
    email,
    password: newPassword,
  });

  if (authResult.error)
    return { success: false, reason: "Auth fehlgeschlagen" };

  const updateResult = await supabase
    .from("users")
    .update({
      pw_changed: true,
      temp_pw: null,
    })
    .eq("email", email);

  if (updateResult.error)
    return { success: false, reason: "Update fehlgeschlagen" };

  return { success: true };
};
