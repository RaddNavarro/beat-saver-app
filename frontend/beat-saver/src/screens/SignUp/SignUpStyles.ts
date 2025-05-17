import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgb(245, 245, 245);
`;

export const SignUpText = styled(Text)`
  font-size: 24px;
  color: #4a90e2;
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
