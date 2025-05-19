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
import { Props } from "../../navigation/props";
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
  SignUpText,
} from "./SignUpStyles";
import { useState } from "react";
import { AUTH } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp: React.FC<Props> = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
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

      Alert.alert("User Created");
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const SignUpSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(7).lowercase(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  if (isLoading) {
    <LoadingContainer>
      <Loading />
      <Text>Loading...</Text>
    </LoadingContainer>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardContainer behavior="padding">
        <SignUpText>SignUp</SignUpText>
        {/* <Container> */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            // setEmail(values.email);
            // setPassword(values.password);
            // setFirstName(values.firstName);
            // setLastName(values.lastName);
            console.log(values);
            handleRegister(values.email, values.password);
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
                <ErrorText>
                  {props.touched.email && props.errors.email}
                </ErrorText>
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
                  <BtnText>Register</BtnText>
                </Btn>
              </BtnContainer>
            </>
          )}
        </Formik>
        <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
      </KeyboardContainer>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
