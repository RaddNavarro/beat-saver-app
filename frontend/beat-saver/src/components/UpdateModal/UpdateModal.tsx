import { View, Text } from "react-native";
import { Modal as RNModal, ModalProps } from "react-native";
import { PROPS } from "../../navigation/props";
import React from "react";

const UpdateModal = ({ isOpen, withInput, children, ...rest }: PROPS) => {
  return (
    <View>
      <Text>UpdateModal</Text>
    </View>
  );
};

export default UpdateModal;
