import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { UserProps } from "../../../../navigation/props";
import {
  Container,
  UserEmail,
  UserImage,
  UserInfo,
  Username,
  UserProfile,
  UserProfileText,
} from "./UserItemStyles";

const UserItem = ({ user }: UserProps) => {
  return (
    <Container>
      {/* <UserImage /> */}
      <UserProfile>
        <UserProfileText>
          {user.firstName.charAt(0)} {user.lastName.charAt(0)}
        </UserProfileText>
      </UserProfile>
      <UserInfo>
        <Username>
          {user.firstName} {user.lastName}
        </Username>
        <UserEmail>{user.email}</UserEmail>
      </UserInfo>
    </Container>
  );
};

export default UserItem;
