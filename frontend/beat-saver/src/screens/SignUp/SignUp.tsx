import { Text, View, Button } from "react-native";
import { Props } from "../../navigation/props";

const SignUp: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>SignUp</Text>
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </View>
  );
};

export default SignUp;
