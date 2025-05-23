import {
  Text,
  View,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { CreateUserFormProps, Props } from "../../../navigation/props";
import {
  Btn,
  BtnContainer,
  BtnText,
  Content,
  ErrorText,
  InputContainer,
  InputText,
  KeyboardContainer,
  Loading,
  LoadingContainer,
  CreateTeensText,
  SafeArea,
} from "./CreateTeensStyles";
import { useState } from "react";
import { AUTH, DB } from "../../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import CreateUserForm from "../../../components/CreateUserForm/CreateUserForm";

const CreateTeens: React.FC<CreateUserFormProps> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;
  const db = DB;
  const parenUid = route.params.parentUid;
  const addTeenUser = async (
    email: string,
    firstName: string,
    lastName: string,
    userId: string,
    parentUid: string
  ) => {
    console.log(userId);
    const teensUsersDoc = doc(db, "teens", userId);
    const parentsUsersDoc = doc(db, "parents", parenUid);

    const teensData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      parentId: parentUid,
    };

    const teensField = {
      teens: arrayUnion(userId),
    };
    try {
      await setDoc(teensUsersDoc, teensData);
      await updateDoc(parentsUsersDoc, teensField);
      console.log("teens collection added");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
        <Text>Loading...</Text>
      </LoadingContainer>
    );
  }

  return (
    <SafeArea>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardContainer behavior="padding">
          <Content>
            <CreateTeensText>Create new teen</CreateTeensText>
            <CreateUserForm
              navigation={navigation}
              addTeenUser={addTeenUser}
              parentUid={parenUid}
            />
          </Content>
        </KeyboardContainer>
      </TouchableWithoutFeedback>
    </SafeArea>
  );
};

export default CreateTeens;
