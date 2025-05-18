import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LogIn from "../screens/LogIn/LogIn";
import SignUp from "../screens/SignUp/SignUp";
import Profile from "../screens/TeenScreens/Profile/Profile";
import { onAuthStateChanged, User } from "@firebase/auth";
import { AUTH } from "../db/firebase";

const Stack = createNativeStackNavigator();
const NestedStack = createNativeStackNavigator();
function NestedLayoutTeen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="ProfileTeen" component={Profile} />
    </NestedStack.Navigator>
  );
}

const AppNavigator = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        {user ? (
          <Stack.Screen
            name="Nested"
            component={NestedLayoutTeen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
