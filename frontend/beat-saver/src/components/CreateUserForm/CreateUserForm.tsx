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
import { CreateUserFormProps, Props } from "../../navigation/props";
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
  FormText,
} from "./CreateUserFormStyles";
import { useState } from "react";
import { AUTH, DB } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  navigation,
  addParentUser,
  addTeenUser,
}) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = response.user.uid;
      Alert.alert("User Created");
      return uid;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const FormsSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(7).lowercase(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
        <Text>Loading...</Text>
      </LoadingContainer>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={FormsSchema}
        onSubmit={async (values, actions) => {
          const uid = await handleRegister(values.email, values.password);

          if (!uid) {
            return;
          }

          if (addParentUser)
            await addParentUser(
              values.email,
              values.firstName,
              values.lastName,
              uid
            );
          if (addTeenUser)
            await addTeenUser(
              values.email,
              values.firstName,
              values.lastName,
              uid
            );

          actions.resetForm();
        }}
      >
        {(props) => (
          <>
            <InputContainer>
              <InputText
                placeholder="First Name"
                value={props.values.firstName}
                onChangeText={props.handleChange("firstName")}
                onBlur={props.handleBlur("firstName")}
              />
              <ErrorText>
                {props.touched.firstName && props.errors.firstName}
              </ErrorText>
              <InputText
                placeholder="Last Name"
                value={props.values.lastName}
                onChangeText={props.handleChange("lastName")}
                onBlur={props.handleBlur("lastName")}
              />
              <ErrorText>
                {props.touched.lastName && props.errors.lastName}
              </ErrorText>
              <InputText
                placeholder="Email"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
              />
              <ErrorText>{props.touched.email && props.errors.email}</ErrorText>
              <InputText
                placeholder="Password"
                value={props.values.password}
                onChangeText={props.handleChange("password")}
                secureTextEntry
                onBlur={props.handleBlur("password")}
              />
              <ErrorText>
                {props.touched.password && props.errors.password}
              </ErrorText>
            </InputContainer>
            <BtnContainer>
              <Btn onPress={() => props.handleSubmit()}>
                <BtnText>Add A New User</BtnText>
              </Btn>
            </BtnContainer>
          </>
        )}
      </Formik>
    </>
  );
};

export default CreateUserForm;
