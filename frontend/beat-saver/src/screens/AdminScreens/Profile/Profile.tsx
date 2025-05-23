import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Props } from "../../../navigation/props";
import { AUTH } from "../../../db/firebase";
import { getAuth, onAuthStateChanged, signOut, User } from "@firebase/auth";
import {
  Avatar,
  AvatarContainer,
  AvatarTxt,
  BackIcon,
  Container,
  ForwardArrow,
  Header,
  LogOut,
  LogOutContainer,
  LogOutIcon,
  LogOutTxt,
  Name,
  NameContainer,
  OptionsContainer,
  Title,
  TitleContainer,
  UserInfo,
} from "./ProfileAdminStyles";

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
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={26} />
        </TouchableOpacity>
        <TitleContainer style={{ flex: 1, alignItems: "center" }}>
          <Title>Profile</Title>
        </TitleContainer>
      </Header>

      <UserInfo></UserInfo>
      <AvatarContainer>
        <Avatar>
          <AvatarTxt>A</AvatarTxt>
        </Avatar>
      </AvatarContainer>

      <NameContainer>
        <Name>Admin</Name>
      </NameContainer>
      <OptionsContainer onPress={signOutUser}>
        <LogOutContainer>
          <LogOut>
            <LogOutIcon name="log-out" size={30} color="white" />
          </LogOut>
          <LogOutTxt>Logout</LogOutTxt>
        </LogOutContainer>
        <ForwardArrow name="arrow-forward-ios" size={26} />
      </OptionsContainer>
    </Container>
  );
};

export default Profile;
