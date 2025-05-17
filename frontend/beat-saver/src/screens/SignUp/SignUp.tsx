import { Text, View, Button } from "react-native";
import { Props } from "../../navigation/props";
import {
  Btn,
  BtnContainer,
  BtnText,
  Container,
  InputContainer,
  InputText,
  SignUpText,
} from "./SignUpStyles";
import { useState } from "react";
import { auth } from "../../db/firebase";

const SignUp: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    try {
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
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
        <Btn>
          <BtnText>Register</BtnText>
        </Btn>
      </BtnContainer>

      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </Container>
  );
};

export default SignUp;
