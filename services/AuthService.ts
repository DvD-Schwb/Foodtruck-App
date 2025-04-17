import { supabase } from "./Supabase";

//register a new user based on a magic link invite
async function registerUser(email: string) {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });
  if (error) {
    console.error("Error signing up:", error.message);
  }
  return user;
}

//when logging in for the first time, set password

//on further logins, login with email and password
