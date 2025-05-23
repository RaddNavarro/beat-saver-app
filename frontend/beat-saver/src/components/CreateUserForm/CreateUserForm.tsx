import {
  Text,
  View,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import * as yup from "yup";
import { CreateUserFormProps, Props, UserForm } from "../../navigation/props";
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
  FormText,
  Icon,
  PasswordVisibleBtn,
} from "./CreateUserFormStyles";
import Feather from "@expo/vector-icons/Feather";
import { SetStateAction, useState } from "react";
import { AUTH, DB } from "../../db/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  navigation,
  addParentUser,
  addTeenUser,
  parentUid,
}) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentUserPassword, setCurrentUserPassword] = useState("");
  const [pendingUserData, setPendingUserData] = useState<
    UserForm | FormikHelpers<UserForm> | null | Object
  >();
  const auth = AUTH;

  const handleRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    currentPassword: string
  ) => {
    setIsLoading(true);

    const currentUser = auth.currentUser;
    const currentUserEmail = currentUser?.email;

    if (!currentUser || !currentUserEmail) {
      setIsLoading(false);
      Alert.alert("Error", "No current user found");
      return null;
    }

    try {
      // FIRST: Validate the parent's password by re-authenticating them
      // This doesn't change the current session, just verifies the password
      const { EmailAuthProvider, reauthenticateWithCredential } = await import(
        "firebase/auth"
      );

      const credential = EmailAuthProvider.credential(
        currentUserEmail,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      console.log("verified");

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUserUid = response.user.uid;

      await signOut(auth);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await signInWithEmailAndPassword(auth, currentUserEmail, currentPassword);

      await new Promise((resolve) => setTimeout(resolve, 500));

      Alert.alert("Success", "User created successfully!");
      return newUserUid;
    } catch (error) {
      console.log("Error in user creation process:", error);

      let errorMessage = "Incorrect password";

      Alert.alert("Error", errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const FormsSchema = yup.object({
    email: yup
      .string()
      .required("Please enter an email")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Please enter a password")
      .min(7, "Please enter a minimum of 7 characters"),
    firstName: yup.string().required("Please enter a first name"),
    lastName: yup.string().required("Please enter a last name"),
  });

  const handleSubmitWithPasswordCheck = async (
    values: UserForm,
    actions: FormikHelpers<UserForm>
  ) => {
    setPendingUserData({ values, actions });

    setShowPasswordModal(true);
  };

  const confirmCreateUser = async () => {
    if (!pendingUserData || !currentUserPassword) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    const { values, actions }: any = pendingUserData;

    setShowPasswordModal(false);

    const uid = await handleRegister(
      values.email,
      values.password,
      values.firstName,
      values.lastName,
      currentUserPassword
    );

    if (!uid) {
      setCurrentUserPassword("");
      return;
    }
    if (addParentUser) {
      await addParentUser(values.email, values.firstName, values.lastName, uid);
    }

    if (addTeenUser && parentUid) {
      await addTeenUser(
        values.email,
        values.firstName,
        values.lastName,
        uid,
        parentUid
      );
    }

    actions.resetForm();
    setCurrentUserPassword("");
    setPendingUserData(null);

    // Navigate back to parent home screen after successful creation
    if (navigation && addTeenUser) {
      // Navigate back to the parent's home screen
      navigation.navigate("HomeParent");
    }

    if (navigation && addParentUser) {
      // Navigate back to the parent's home screen
      navigation.navigate("Dashboard");
    }
  };

  const cancelCreateUser = () => {
    setShowPasswordModal(false);
    setCurrentUserPassword("");
    setPendingUserData(null);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
        <Text>Creating user...</Text>
      </LoadingContainer>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={FormsSchema}
        onSubmit={(values: UserForm, actions: FormikHelpers<UserForm>) =>
          handleSubmitWithPasswordCheck(values, actions)
        }
      >
        {(props: FormikProps<UserForm>) => (
          <>
            <InputContainer>
              <InputText
                placeholder="First Name"
                value={props.values.firstName}
                onChangeText={props.handleChange("firstName")}
                onBlur={props.handleBlur("firstName")}
              />
            </InputContainer>
            <ErrorText>
              {props.touched.firstName && props.errors.firstName}
            </ErrorText>
            <InputContainer>
              <InputText
                placeholder="Last Name"
                value={props.values.lastName}
                onChangeText={props.handleChange("lastName")}
                onBlur={props.handleBlur("lastName")}
              />
            </InputContainer>
            <ErrorText>
              {props.touched.lastName && props.errors.lastName}
            </ErrorText>
            <InputContainer>
              <InputText
                placeholder="Email"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
              />
            </InputContainer>
            <ErrorText>{props.touched.email && props.errors.email}</ErrorText>
            <InputContainer>
              <InputText
                placeholder="Password"
                value={props.values.password}
                onChangeText={props.handleChange("password")}
                secureTextEntry={visiblePassword ? false : true}
                onBlur={props.handleBlur("password")}
              />
              <PasswordVisibleBtn
                onPress={() => setVisiblePassword(!visiblePassword)}
              >
                <Feather name="eye-off" size={20} color="#7C807D" />
              </PasswordVisibleBtn>
            </InputContainer>
            <ErrorText>
              {props.touched.password && props.errors.password}
            </ErrorText>
            <Btn onPress={() => props.handleSubmit()}>
              <BtnText>Add A New User</BtnText>
            </Btn>
          </>
        )}
      </Formik>

      {/* Password Confirmation Modal */}
      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelCreateUser}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Confirm Your Password
            </Text>
            <Text
              style={{
                marginBottom: 20,
                textAlign: "center",
                color: "#666",
              }}
            >
              Please enter your current password to create the new user
            </Text>

            <InputContainer>
              <InputText
                placeholder="Your Current Password"
                value={currentUserPassword}
                onChangeText={setCurrentUserPassword}
                secureTextEntry={true}
                autoFocus={true}
              />
            </InputContainer>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Btn
                onPress={cancelCreateUser}
                style={{ backgroundColor: "#ccc", flex: 0.45 }}
              >
                <BtnText style={{ color: "#333" }}>Cancel</BtnText>
              </Btn>

              <Btn onPress={confirmCreateUser} style={{ flex: 0.45 }}>
                <BtnText>Confirm</BtnText>
              </Btn>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateUserForm;
