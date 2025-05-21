import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogIn from "../screens/LogIn/LogIn";
import ProfileTeen from "../screens/TeenScreens/Profile/Profile";
import ProfileParent from "../screens/ParentScreens/Profile/Profile";
import ProfileAdmin from "../screens/AdminScreens/Profile/Profile";
import { onAuthStateChanged, User } from "@firebase/auth";
import { AUTH, DB } from "../db/firebase";
import CreateTeens from "../screens/ParentScreens/CreateTeen/CreateTeens";
import CreateParents from "../screens/AdminScreens/CreateParents/CreateParents";
import { doc, getDoc } from "firebase/firestore";
import { Loading, LoadingContainer } from "./AppNavigatorStyles";
import { Text } from "react-native";
import Dashboard from "../screens/AdminScreens/Dashboard/Dashboard";

// Define user roles
type UserRole = "parent" | "teen" | "admin" | null;

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
      <NestedStack.Screen name="Dashboard" component={Dashboard} />
      <NestedStack.Screen name="ProfileAdmin" component={ProfileAdmin} />
    </NestedStack.Navigator>
  );
}

const AppNavigator = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await determineUserRole(currentUser.uid);
      } else {
        setUserRole(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const determineUserRole = async (userId: string) => {
    const parentPath = doc(DB, "parents", userId);
    const teenPath = doc(DB, "teens", userId);
    const adminPath = doc(DB, "admins", userId);

    try {
      setIsLoading(true);
      const parentDoc = await getDoc(parentPath);
      if (parentDoc.exists()) {
        setUserRole("parent");
        setIsLoading(false);
        return;
      }

      const teenDoc = await getDoc(teenPath);
      if (teenDoc.exists()) {
        setUserRole("teen");
        setIsLoading(false);
        return;
      }

      const adminDoc = await getDoc(adminPath);
      if (adminDoc.exists()) {
        setUserRole("admin");
        setIsLoading(false);
        return;
      }

      setUserRole(null);
      setIsLoading(false);
    } catch (error) {
      console.error("nope");
      setUserRole(null);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
        <Text>Loading...</Text>
      </LoadingContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          userRole === "parent" ? (
            <Stack.Screen name="NestedParent" component={NestedLayoutParent} />
          ) : userRole === "teen" ? (
            <Stack.Screen name="NestedTeen" component={NestedLayoutTeen} />
          ) : userRole === "admin" ? (
            <Stack.Screen name="NestedAdmin" component={NestedLayoutAdmin} />
          ) : (
            <Stack.Screen name="LogIn" component={LogIn} />
          )
        ) : (
          <>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="CreateTeens" component={CreateTeens} />
            <Stack.Screen name="CreateParents" component={CreateParents} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
