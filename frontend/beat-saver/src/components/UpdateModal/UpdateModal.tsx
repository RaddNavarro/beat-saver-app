import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Modal as RNModal, ModalProps } from "react-native";
import { PROPS } from "../../navigation/props";
import React from "react";
import { AndroidKeyboardView, KeyboardView } from "./UpdateModalStyles";

const UpdateModal = ({ isOpen, withInput, children, ...rest }: PROPS) => {
  const content = withInput ? (
    <KeyboardView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {children}
    </KeyboardView>
  ) : (
    <AndroidKeyboardView>{children}</AndroidKeyboardView>
  );

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </Modal>
  );
};

export default UpdateModal;
