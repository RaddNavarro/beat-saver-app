import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Props, UserProps } from "../../../../navigation/props";
import {
  Container,
  UserEmail,
  UserImage,
  UserInfo,
  Username,
  UserProfile,
  UserProfileText,
} from "./UserItemStyles";

const UserItem = ({ navigation, user, parentId }: Props & UserProps) => {
  useEffect(() => {
    console.log(user);
    console.log(parentId);
  }, []);

  return (
    <Container
      onPress={() =>
        navigation.navigate("ParentInfo", { user: user, parentId: parentId })
      }
    >
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
