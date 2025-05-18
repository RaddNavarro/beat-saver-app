import { Text, View, Button, Alert } from "react-native";
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
} from "./LogInStyles";
import { AUTH } from "../../db/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

const LogIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;

  const handleLogIn = async () => {
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

  if (isLoading) {
    <LoadingContainer>
      <Loading />
      <Text>Loading...</Text>
    </LoadingContainer>;
  }

  return (
    <Container>
      <LogInText>LogIn Page</LogInText>
      <InputContainer>
        <InputText placeholder="Email" value={email} onChangeText={setEmail} />
        <InputText
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </InputContainer>
      <Text>{email}</Text>
      <Text>{password}</Text>
      <BtnContainer>
        <Btn onPress={handleLogIn}>
          <BtnText>Log In</BtnText>
        </Btn>
      </BtnContainer>
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </Container>
  );
};

export default LogIn;
