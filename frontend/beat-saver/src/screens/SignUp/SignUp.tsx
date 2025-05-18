import { Text, View, Button, Alert } from "react-native";
import { Props } from "../../navigation/props";
import {
  Btn,
  BtnContainer,
  BtnText,
  Container,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = AUTH;

  const handleRegister = async () => {
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

  if (isLoading) {
    <LoadingContainer>
      <Loading />
      <Text>Loading...</Text>
    </LoadingContainer>;
  }

  return (
    <KeyboardContainer behavior="padding">
      <SignUpText>SignUp</SignUpText>
      <InputContainer>
        <InputText
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputText
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </InputContainer>

      <BtnContainer>
        <Btn onPress={handleRegister}>
          <BtnText>Register</BtnText>
        </Btn>
      </BtnContainer>

      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </KeyboardContainer>
  );
};

export default SignUp;
