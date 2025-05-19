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
  Container,
  ErrorText,
  InputContainer,
  InputText,
  KeyboardContainer,
  Loading,
  LoadingContainer,
  CreateParentsText,
} from "./CreateParentsStyles";
import { useState } from "react";
import { AUTH, DB } from "../../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CreateUserForm from "../../../components/CreateUserForm/CreateUserForm";
import firebase from "firebase/compat/app";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardContainer behavior="padding">
        <CreateParentsText>Create Parent</CreateParentsText>
        <CreateUserForm navigation={navigation} addParentUser={addParentUser} />
        <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
      </KeyboardContainer>
    </TouchableWithoutFeedback>
  );
};

export default CreateParents;
