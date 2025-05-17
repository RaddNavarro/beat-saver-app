import { Text, View, Button } from "react-native";
import { Props } from "../../navigation/props";
import { LogInText, Container } from "./LogInStyles";

const LogIn: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <LogInText>LogIn Page</LogInText>
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </Container>
  );
};

export default LogIn;
