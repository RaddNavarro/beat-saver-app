import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import AddExpenses from "./src/screens/TeenScreens/AddExpenses/AddExpenses";

export default function App() {

  return <AddExpenses />;
}
