import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import {
  checkUserEligibility,
  completeFirstLogin,
} from "../services/AuthService";

const FirstLoginScreen = () => {
  // 📦 STATE
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"check" | "newPassword">("check");

  // ⚙️ FUNKTIONEN
  const handleCheck = async () => {
    const result = await checkUserEligibility(email, tempPassword);
    if (!result.success) {
      Alert.alert("Fehler", result.reason);
      return;
    }
    setStep("newPassword");
  };

  const handleComplete = async () => {
    const result = await completeFirstLogin(email, newPassword);
    if (!result.success) {
      Alert.alert("Fehler", result.reason);
      return;
    }
    Alert.alert(
      "Erfolg",
      "Dein Passwort wurde gesetzt. Du kannst dich nun einloggen."
    );
    // Optional: z. B. Navigation zum Home/Login Screen
  };

  // 🖼️ RENDERING
  return (
    <View style={{ padding: 16 }}>
      {step === "check" && (
        <>
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={{ borderBottomWidth: 1, marginBottom: 12 }}
          />
          <Text>Einmalpasswort</Text>
          <TextInput
            value={tempPassword}
            onChangeText={setTempPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 12 }}
          />
          <Button title="Login prüfen" onPress={handleCheck} />
        </>
      )}

      {step === "newPassword" && (
        <>
          <Text>Neues Passwort</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 12 }}
          />
          <Button title="Passwort setzen" onPress={handleComplete} />
        </>
      )}
    </View>
  );
};

export default FirstLoginScreen;
