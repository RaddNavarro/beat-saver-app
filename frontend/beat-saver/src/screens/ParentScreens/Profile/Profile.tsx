import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { Props } from "../../../navigation/props";
import { AUTH } from "../../../db/firebase";
import { getAuth, onAuthStateChanged, signOut, User } from "@firebase/auth";

const Profile: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      setUser(user);
    }
  });

  const signOutUser = async () => {
    try {
      const signedOut = await signOut(AUTH);
      if (signedOut !== null) {
        console.log("User signed out!");

        // navigation.navigate("LogIn");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>{user?.uid}</Text>
      <Text>{user?.email}</Text>

      <Button title="Sign Out" onPress={signOutUser} />
    </View>
  );
};

export default Profile;
