import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Props } from "../../../navigation/props";
import {
  Avatar,
  AvatarContainer,
  AvatarTxt,
  BackIcon,
  Container,
  DeleteUser,
  DeleteUserContainer,
  DeleteUserIcon,
  DeleteUserTxt,
  ForwardArrow,
  Header,
  Name,
  NameContainer,
  OptionsContainer,
  OptionsItem,
  Title,
  TitleContainer,
  Update,
  UpdateContainer,
  UpdateIcon,
  UpdateTxt,
  UserInfo,
} from "./ParentInfoStyles";

const ParentInfo: React.FC<Props> = ({ navigation, route }) => {
  const user = route.params.user;
  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={26} />
        </TouchableOpacity>
        <TitleContainer style={{ flex: 1, alignItems: "center" }}>
          <Title>Parent Info</Title>
        </TitleContainer>
      </Header>

      <UserInfo></UserInfo>
      <AvatarContainer>
        <Avatar>
          <AvatarTxt>
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </AvatarTxt>
        </Avatar>
      </AvatarContainer>

      <NameContainer>
        <Name>
          {user.firstName} {user.lastName}
        </Name>
      </NameContainer>
      <OptionsContainer>
        <OptionsItem onPress={() => {}}>
          <UpdateContainer>
            <Update>
              <UpdateIcon name="update" size={30} color="white" />
            </Update>
            <UpdateTxt>Update Parent User</UpdateTxt>
          </UpdateContainer>

          <ForwardArrow name="arrow-forward-ios" size={26} />
        </OptionsItem>
        <OptionsItem onPress={() => {}}>
          <DeleteUserContainer>
            <DeleteUser>
              <DeleteUserIcon name="deleteuser" size={30} color="white" />
            </DeleteUser>
            <DeleteUserTxt>Delete Parent User</DeleteUserTxt>
          </DeleteUserContainer>

          <ForwardArrow name="arrow-forward-ios" size={26} />
        </OptionsItem>
      </OptionsContainer>
    </Container>
  );
};

export default ParentInfo;
