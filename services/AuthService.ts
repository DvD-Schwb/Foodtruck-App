import { supabase } from "./Supabase";

export const checkUserEligibility = async (
  email: string,
  tempPassword: string
) => {
  /* // Versuche verschiedene Abfragevarianten
  const { data: allUsers } = await supabase.from("users").select("*");
  console.log("Alle Benutzer:", allUsers);

  const { data: exactMatch } = await supabase
    .from("users")
    .select("*")
    .eq("email", "test@mail.de"); // Hardcoded zum Testen
  console.log("Exakter Match mit Hardcoded Email:", exactMatch);

  const { data: userMatch } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  console.log("Match mit übergebener Email:", userMatch, "Email war:", email);

  const { data: ilikeMatch } = await supabase
    .from("users")
    .select("*")
    .ilike("email", email);
  console.log("Case-insensitive Match:", ilikeMatch); */
  try {
    console.log(`Checking eligibility for email: ${email}`);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .ilike("email", email.trim())
      .maybeSingle();

    console.log("Supabase Response", { user, error });

    if (error) {
      console.error("Supabase error:", error);
      return {
        success: false,
        reason: `Datenbankfehler: ${error.message}`,
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
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      reason: `Unerwarteter Fehler: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
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
