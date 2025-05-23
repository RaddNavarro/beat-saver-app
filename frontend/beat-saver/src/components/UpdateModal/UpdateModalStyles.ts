import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components";

export const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const AndroidKeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding-horizontal: 20px;
`;
