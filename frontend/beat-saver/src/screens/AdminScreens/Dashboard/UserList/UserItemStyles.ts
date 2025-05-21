import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;

// if the parents is gonna have an image
export const UserImage = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: 90px / 2px;
  margin-top: 20px;
  z-index: 1;
  maregin-left: 10px;
`;

export const UserProfile = styled(TouchableOpacity)`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-top: 20px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  background-color: lavender;
  margin-right: -50px;
`;

export const UserProfileText = styled(Text)`
  font-weight: bold;
  letter-spacing: -2px;
  font-size: 24px;
`;

export const UserInfo = styled(View)`
  background-color: white;
  margin-top: 32px;
  padding-horizontal: 25px;
  justify-content: center;
  border-radius: 25px;
  flex: 1;
  margin-right: 10px;
  padding-top: 20px;
`;

export const Username = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: #291734;
  margin-left: 30px;
  padding-bottom: 10px;
`;

export const UserEmail = styled(Text)`
  font-size: 12px;
  font-weight: 400px;
  color: #0a0a0a;
  padding-left: 30px;
  padding-bottom: 10px;
`;
