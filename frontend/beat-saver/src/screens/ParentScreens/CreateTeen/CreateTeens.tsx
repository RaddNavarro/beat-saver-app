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
  CreateTeensText,
  SafeArea,
} from "./CreateTeensStyles";
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

const CreateTeens: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;
  const db = DB;

  const addTeenUser = async (
    email: string,
    firstName: string,
    lastName: string,
    userId: string
  ) => {
    console.log(userId);
    const teensUsersCollection = doc(db, "teens", userId);

    const teensData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      await setDoc(teensUsersCollection, teensData);
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
            <CreateUserForm navigation={navigation} addTeenUser={addTeenUser} />
          </Content>
          {/* <Button title="Log In" onPress={() => navigation.navigate("LogIn")} /> */}
        </KeyboardContainer>
      </TouchableWithoutFeedback>
    </SafeArea>
  );
};

export default CreateTeens;
