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
import { Props } from "../../../navigation/props";
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
  CreateParentsText,
  SafeArea,
} from "./CreateParentsStyles";
import { useState } from "react";
import { AUTH, DB } from "../../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import CreateUserForm from "../../../components/CreateUserForm/CreateUserForm";

const CreateParents: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;
  const db = DB;

  const addParentUser = async (
    email: string,
    firstName: string,
    lastName: string,
    userId: string
  ) => {
    console.log(userId);
    const parentUsersCollection = doc(db, "parents", userId);

    const parentData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      await setDoc(parentUsersCollection, parentData);
      console.log("parent collection added");
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
            <CreateParentsText>Create Parent</CreateParentsText>
            <CreateUserForm
              navigation={navigation}
              addParentUser={addParentUser}
            />
          </Content>
        </KeyboardContainer>
      </TouchableWithoutFeedback>
    </SafeArea>
  );
};

export default CreateParents;
