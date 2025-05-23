import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export const Header = styled(View)`
  margin-top: 43px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContainer = styled(View)`
  flex: 1;
  align-items: center;
  right: 10px;
`;

export const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

export const Container = styled(View)`
  flex: 1;
  background-color: #ffffff;
`;

export const BackIcon = styled(Ionicons)``;

export const UserInfo = styled(View)`
  margin-top: 30px;
  align-items: center;
  gap: 15px;
`;

export const AvatarContainer = styled(View)`
  position: relative;
  align-self: center;
`;

export const Avatar = styled(View)`
  align-self: center;
  background-color: lavender;
  height: 135px;
  width: 135px;
  border-radius: 200px;
`;

export const AvatarTxt = styled(Text)`
  font-weight: bold;
  font-size: 70px;
  align-self: center;
  top: 15px;
`;

export const NameContainer = styled(View)`
  gap: 4px;
  align-items: center;
`;

export const Name = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`;

export const UpdateContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Update = styled(View)`
  background-color: #8a2be2;
  border-radius: 50px;
`;

export const UpdateIcon = styled(MaterialIcons)`
  padding: 10px;
`;

export const UpdateTxt = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
`;

export const UpdateModalContainer = styled(View)`
  background-color: #f5f5f5;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
`;

export const OptionsContainer = styled(View)`
  margin-top: 20px;
  padding: 20px;
`;

export const OptionsItem = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ForwardArrow = styled(MaterialIcons)``;

export const DeleteUserContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const DeleteUser = styled(View)`
  background-color: #000000;
  border-radius: 50px;
`;

export const DeleteUserTxt = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
`;
export const DeleteUserIcon = styled(AntDesign)`
  padding: 10px;
`;

export const InputContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
`;

export const Icon = styled(View)`
  margin-right: 15px;
`;

export const InputText = styled(TextInput)`
  border-bottom-width: 1.5px;
  flex: 1;
  padding-bottom: 10px;
  border-bottom-color: #eeeeee;
  font-size: 16px;
`;

export const PasswordVisibleBtn = styled(TouchableOpacity)`
  position: absolute;
  right: 0px;
`;

export const ErrorText = styled(Text)`
  color: #e00000;
  margin-bottom: 10px;
  margin-top: 6px;
  text-align: center;
`;

export const UpdateParentsText = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const Btn = styled(TouchableOpacity)`
  background-color: #8a2be2;
  padding: 14px;
  border-radius: 10px;
  margin-top: 20px;
`;

export const BtnText = styled(Text)`
  color: #ffffff;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
`;

export const CloseBtn = styled(TouchableOpacity)`
  background-color: #f5f5f5;
  padding: 14px;
  border-radius: 10px;
  margin-top: 20px;
`;

export const CloseBtnText = styled(Text)`
  color: #000000;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
`;

export const BtnContainer = styled(View)`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const LoadingContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: ${StatusBar.currentHeight}px;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled(ActivityIndicator)`
  size: large;
  color: #0000ff;
`;
