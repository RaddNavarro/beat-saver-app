import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  background-color: #ffffff;
  padding-vertical: 22px;
  padding-horizontal: 22px;
`;

export const FlatListUser = styled(FlatList)`
  padding-vertical: 10px;
`;

export const Header = styled(View)`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

export const AdminProfile = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 45px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  background-color: lavender;
`;

export const AdminProfileTxt = styled(Text)`
  font-weight: bold;
  font-size: 20px;
`;

export const SectionContainer = styled(View)`
  margin-top: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;
