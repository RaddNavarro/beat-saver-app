import { Text, View, Button, Alert } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Props } from "../../navigation/props";
import {
  LogInText,
  Container,
  InputContainer,
  InputText,
  BtnContainer,
  Btn,
  BtnText,
  LoadingContainer,
  Loading,
  ErrorText,
} from "./LogInStyles";
import { AUTH } from "../../db/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

const LogIn: React.FC<Props> = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;

  const handleLogIn = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("bruh");
      console.log(response.user.uid);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log("Login error:", firebaseError.code, firebaseError.message);

      // Show user-friendly error message
      let errorMessage = "Failed to log in. Please try again.";
      if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/user-not-found" ||
        firebaseError.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later";
      } else if (firebaseError.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection";
      }

      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const LogInSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(7).lowercase(),
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
    <Container>
      <LogInText>LogIn Page</LogInText>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LogInSchema}
        onSubmit={(values, actions) => {
          // setEmail(values.email);
          // setPassword(values.password);
          handleLogIn(values.email, values.password);
          actions.resetForm();
        }}
      >
        {(props) => (
          <>
            <InputContainer>
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
                <BtnText>Login</BtnText>
              </Btn>
            </BtnContainer>
          </>
        )}
      </Formik>
      <Button
        title="CreateTeens"
        onPress={() => navigation.navigate("CreateTeens")}
      />
      <Button
        title="CreateParents"
        onPress={() => navigation.navigate("CreateParents")}
      />
    </Container>
  );
};

export default LogIn;
