import {
  Text,
  View,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Props } from "../../navigation/props";
import {
  LogInText,
  Content,
  InputContainer,
  InputText,
  BtnContainer,
  Btn,
  BtnText,
  LoadingContainer,
  Loading,
  ErrorText,
  KeyboardContainer,
  SafeArea,
  Icon,
  PasswordVisibleBtn,
} from "./LogInStyles";
import Feather from "@expo/vector-icons/Feather";
import { AUTH } from "../../db/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

const LogIn: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleLogIn = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(AUTH, email, password);
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
    email: yup
      .string()
      .required("Please enter an email")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter a password"),
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
    <SafeArea>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardContainer>
          <Content>
            <LogInText>Login</LogInText>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LogInSchema}
              onSubmit={(values, actions) => {
                handleLogIn(values.email, values.password);
                actions.resetForm();
              }}
            >
              {(props) => (
                <>
                  <InputContainer>
                    <Icon>
                      <Feather name="mail" size={22} color="#7C807D" />
                    </Icon>
                    <InputText
                      placeholder="Email address"
                      placeholderTextColor="#7C807D"
                      selectionColor="#3662AA"
                      value={props.values.email}
                      onChangeText={props.handleChange("email")}
                      onBlur={props.handleBlur("email")}
                    />
                  </InputContainer>
                  <ErrorText>
                    {props.touched.email && props.errors.email}
                  </ErrorText>
                  <InputContainer>
                    <Icon>
                      <Feather name="lock" size={22} color="#7C807D" />
                    </Icon>
                    <InputText
                      placeholder="Password"
                      placeholderTextColor="#7C807D"
                      selectionColor="#3662AA"
                      value={props.values.password}
                      onChangeText={props.handleChange("password")}
                      secureTextEntry={!visiblePassword}
                      onBlur={props.handleBlur("password")}
                    />
                    <PasswordVisibleBtn
                      onPress={() => setVisiblePassword(!visiblePassword)}
                    >
                      <Feather
                        name={visiblePassword ? "eye" : "eye-off"}
                        size={20}
                        color="#7C807D"
                      />
                    </PasswordVisibleBtn>
                  </InputContainer>
                  <ErrorText>
                    {props.touched.password && props.errors.password}
                  </ErrorText>
                  <Btn onPress={() => props.handleSubmit()}>
                    <BtnText>Login</BtnText>
                  </Btn>
                </>
              )}
            </Formik>
            <Button
              title="Create Parent Account"
              onPress={() => navigation.navigate("CreateParents")}
            />
          </Content>
        </KeyboardContainer>
      </TouchableWithoutFeedback>
    </SafeArea>
  );
};

export default LogIn;
