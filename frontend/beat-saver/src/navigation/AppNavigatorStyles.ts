import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";

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
