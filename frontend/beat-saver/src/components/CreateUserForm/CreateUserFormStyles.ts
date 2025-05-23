import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(245, 245, 245);
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

export const KeyboardContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FormText = styled(Text)`
  font-size: 24px;
  color: #4a90e2;
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

export const BtnContainer = styled(View)`
  width: 60%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
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

export const LoadingContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: ${StatusBar.currentHeight};
  justify-content: center;
  align-items: center;
`;

export const Loading = styled(ActivityIndicator)`
  size: large;
  color: #0000ff;
`;
