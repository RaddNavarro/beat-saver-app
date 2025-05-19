import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LogIn from "../screens/LogIn/LogIn";
import ProfileTeen from "../screens/TeenScreens/Profile/Profile";
import ProfileParent from "../screens/ParentScreens/Profile/Profile";
import ProfileAdmin from "../screens/AdminScreens/Profile/Profile";
import { onAuthStateChanged, User } from "@firebase/auth";
import { AUTH } from "../db/firebase";
import CreateTeens from "../screens/ParentScreens/CreateTeen/CreateTeens";
import CreateParents from "../screens/AdminScreens/CreateParents/CreateParents";

const Stack = createNativeStackNavigator();
const NestedStack = createNativeStackNavigator();
function NestedLayoutTeen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="ProfileTeen" component={ProfileTeen} />
    </NestedStack.Navigator>
  );
}

function NestedLayoutParent() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="ProfileParent" component={ProfileParent} />
    </NestedStack.Navigator>
  );
}

function NestedLayoutAdmin() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="ProfileAdmin" component={ProfileAdmin} />
    </NestedStack.Navigator>
  );
}

const AppNavigator = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(AUTH, (user) => {
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
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="CreateTeens" component={CreateTeens} />
            <Stack.Screen name="CreateParents" component={CreateParents} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
