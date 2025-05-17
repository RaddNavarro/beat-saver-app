import { Text, View, Button } from "react-native";
import { Props } from "../../navigation/props";
import { Container, SignUpText } from "./SignUpStyles";

const SignUp: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <SignUpText>SignUp</SignUpText>
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </Container>
  );
};

export default SignUp;
