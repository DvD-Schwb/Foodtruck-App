import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

function DummyScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{title}</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" children={() => <DummyScreen title="Home" />} />
      <Tab.Screen
        name="Profil"
        children={() => <DummyScreen title="Profil" />}
      />
    </Tab.Navigator>
  );
}
