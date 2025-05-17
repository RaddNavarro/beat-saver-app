import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
`;

export const SignUpText = styled(Text)`
  font-size: 24px;
  color: #4a90e2;
`;

export const InputContainer = styled(View)`
  width: "80%";
`;

export const InputText = styled(TextInput)`
  background-color: "white";
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const BtnContainer = styled(View)``;

export const Btn = styled(TouchableOpacity)``;

export const BtnText = styled(Text)``;
