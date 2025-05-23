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

export const Content = styled(View)`
  padding-horizontal: 30px;
`;

export const KeyboardContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
`;

export const CreateTeensText = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const InputContainer = styled(View)`
  width: 80%;
`;

export const InputText = styled(TextInput)`
  background-color: white;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const ErrorText = styled(Text)`
  color: #e00000;
  font-weight: bold;
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
  background-color: #0782f9;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const BtnText = styled(Text)`
  color: white;
  font-weight: 700;
  font-size: 16px;
`;

export const LoadingContainer = styled(SafeAreaView)`
  position: absolute;
  background-color: #f5f5f5;
  padding-top: ${StatusBar.currentHeight}px;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled(ActivityIndicator)`
  size: large;
  color: #0000ff;
`;
