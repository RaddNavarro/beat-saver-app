import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Props } from "../../../navigation/props";
import {
  Avatar,
  AvatarContainer,
  AvatarTxt,
  BackIcon,
  Btn,
  BtnContainer,
  BtnText,
  CloseBtn,
  CloseBtnText,
  Container,
  DeleteUser,
  DeleteUserContainer,
  DeleteUserIcon,
  DeleteUserTxt,
  ErrorText,
  ForwardArrow,
  Header,
  InputContainer,
  InputText,
  Loading,
  LoadingContainer,
  Name,
  NameContainer,
  OptionsContainer,
  OptionsItem,
  Title,
  TitleContainer,
  Update,
  UpdateContainer,
  UpdateIcon,
  UpdateModalContainer,
  UpdateParentsText,
  UpdateTxt,
  UserInfo,
} from "./ParentInfoStyles";
import UpdateModal from "../../../components/UpdateModal/UpdateModal";
import { Formik } from "formik";
import * as yup from "yup";
import { deleteUser, onAuthStateChanged, User } from "@firebase/auth";
import { AUTH, DB } from "../../../db/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const ParentInfo: React.FC<Props> = ({ navigation, route }) => {
  const user = route.params.user;
  const parentId = route.params.parentId;
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoaing] = useState(false);
  const db = DB;
  const auth = AUTH;

  const FormsSchema = yup.object({
    firstName: yup.string().required("Please enter a first name"),
    lastName: yup.string().required("Please enter a last name"),
  });

  const updateParentUser = async (firstName: string, lastName: string) => {
    setIsLoaing(true);
    const parentsDoc = doc(db, "parents", parentId);
    const parentsField = {
      firstName: firstName,
      lastName: lastName,
    };

    try {
      await updateDoc(parentsDoc, parentsField);
      console.log("updated");
    } catch (error) {
      console.error(error);
    } finally {
      navigation.goBack();
      ToastAndroid.show("User Updated", ToastAndroid.SHORT);
      setIsLoaing(false);
    }
  };

  const askUser = () => {
    Alert.alert(
      "Delete User",
      "Are you sure? This will delete all you teen users as well",
      [
        {
          text: "Cancel",
          onPress: () => console.log("canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteParentUser(),
          style: "default",
        },
      ]
    );
  };

  const deleteParentUser = async () => {
    setIsLoaing(true);
    const parentsDoc = doc(db, "parents", parentId);

    try {
      await deleteDoc(parentsDoc);

      const refQuery = query(
        collection(db, "teens"),
        where("parentId", "==", parentId)
      );

      const refQuerySnapshot = await getDocs(refQuery);
      refQuerySnapshot.forEach(async (refDoc) => {
        await deleteDoc(doc(db, "teens", refDoc.id));
      });
    } catch (error) {
      console.error(error);
    } finally {
      navigation.goBack();
      ToastAndroid.show("User Deleted", ToastAndroid.SHORT);
      setIsLoaing(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
        <Text>Loading...</Text>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-back" size={26} />
        </TouchableOpacity>
        <TitleContainer style={{ flex: 1, alignItems: "center" }}>
          <Title>Parent Info</Title>
        </TitleContainer>
      </Header>

      <UserInfo></UserInfo>
      <AvatarContainer>
        <Avatar>
          <AvatarTxt>
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </AvatarTxt>
        </Avatar>
      </AvatarContainer>

      <NameContainer>
        <Name>
          {user.firstName} {user.lastName}
        </Name>
      </NameContainer>
      <OptionsContainer>
        <OptionsItem onPress={() => setModalOpen(true)}>
          <UpdateContainer>
            <Update>
              <UpdateIcon name="update" size={30} color="white" />
            </Update>
            <UpdateTxt>Update Parent User</UpdateTxt>
          </UpdateContainer>

          <ForwardArrow name="arrow-forward-ios" size={26} />
        </OptionsItem>
        <OptionsItem onPress={askUser}>
          <DeleteUserContainer>
            <DeleteUser>
              <DeleteUserIcon name="deleteuser" size={30} color="white" />
            </DeleteUser>
            <DeleteUserTxt>Delete Parent User</DeleteUserTxt>
          </DeleteUserContainer>

          <ForwardArrow name="arrow-forward-ios" size={26} />
        </OptionsItem>
      </OptionsContainer>
      <UpdateModal isOpen={modalOpen}>
        <UpdateModalContainer>
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
            }}
            validationSchema={FormsSchema}
            onSubmit={(values) => {
              updateParentUser(values.firstName, values.lastName);
              console.log("updated!!");
            }}
          >
            {(props) => (
              <>
                <UpdateParentsText>Update</UpdateParentsText>
                <Text>First Name</Text>
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
                <Text>First Name</Text>
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
                <BtnContainer>
                  <CloseBtn onPress={() => setModalOpen(false)}>
                    <CloseBtnText>Close</CloseBtnText>
                  </CloseBtn>
                  <Btn onPress={() => props.handleSubmit()}>
                    <BtnText>Update User</BtnText>
                  </Btn>
                </BtnContainer>
              </>
            )}
          </Formik>
        </UpdateModalContainer>
      </UpdateModal>
    </Container>
  );
};

export default ParentInfo;
