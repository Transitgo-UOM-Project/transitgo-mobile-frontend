import { Image, StyleSheet, Platform } from "react-native";
import { AuthProvider } from "@/src/context/AuthContext";
import AppMain from "@/src/navigation/AppMain";

export default function FirstScreen() {
  return (
    <AuthProvider>
      <AppMain />
    </AuthProvider>
  );
}
