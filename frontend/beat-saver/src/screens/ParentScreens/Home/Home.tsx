import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { Props } from "../../../navigation/props";
import { onAuthStateChanged, User } from "@firebase/auth";
import { AUTH } from "../../../db/firebase";

const Home: React.FC<Props> = ({ navigation }) => {
  const [currenUser, setCurrentUser] = useState<User | null>(null);

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      setCurrentUser(user);
    }
  });

  return (
    <View>
      <Text>Home Parents</Text>
      <Text>{currenUser?.uid}</Text>
      <Button
        title="Create Teen Account"
        onPress={() =>
          navigation.navigate("CreateTeens", { parentUid: currenUser?.uid })
        }
      />
      <Button
        title="MY PROFILE"
        onPress={() => navigation.navigate("ProfileParent")}
      />
    </View>
  );
};

export default Home;
