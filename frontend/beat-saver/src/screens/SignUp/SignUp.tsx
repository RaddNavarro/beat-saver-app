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

const SignUp: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <SignUpText>SignUp</SignUpText>
      <InputContainer>
        <InputText placeholder="Email" />
        <InputText placeholder="Password" secureTextEntry />
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
