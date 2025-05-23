import { View, Text } from "react-native";
import React from "react";
import { Props } from "../../../navigation/props";

const ParentInfo: React.FC<Props> = ({ navigation, route }) => {
  const user = route.params.user;
  return (
    <View>
      <Text>{user.firstName}</Text>
    </View>
  );
};

export default ParentInfo;
