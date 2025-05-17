import { Text, View, Button } from "react-native";
import { Props } from "../../navigation/props";

const LogIn: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>LogIn</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

export default LogIn;
