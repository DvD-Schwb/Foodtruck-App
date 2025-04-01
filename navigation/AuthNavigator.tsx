// Beispiel für AuthNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstLoginScreen from "../screens/FirstLoginScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={FirstLoginScreen} />
    </Stack.Navigator>
  );
}
