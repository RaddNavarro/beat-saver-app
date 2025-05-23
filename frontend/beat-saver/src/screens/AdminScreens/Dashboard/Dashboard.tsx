import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { AUTH, DB } from "../../../db/firebase";
import {
  AdminProfile,
  AdminProfileTxt,
  Container,
  FlatListUser,
  Header,
  HeaderText,
  SectionContainer,
  SectionTitle,
} from "./DashboardStyles";
import UserItem from "./UserList/UserItem";
import { Props } from "../../../navigation/props";

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const auth = AUTH;
  const db = DB;
  let unsubscribeParent = () => {};
  const [parents, setParents] = useState<DocumentData[]>();
  const [parentsDoc, setParentsDoc] = useState<DocumentData[]>();

  const parentUsersCollection = collection(db, "parents");

  const fetchDocument = () => {
    unsubscribeParent = onSnapshot(parentUsersCollection, (parentSnapshot) => {
      let parentArr: DocumentData[] = [];
      let parentDocArr: DocumentData[] = [];
      if (!parentSnapshot.empty) {
        parentSnapshot.docs.forEach((parent) => {
          parentArr.push(parent.data());
          parentDocArr.push(parent);
        });
        setParents(parentArr);
        setParentsDoc(parentDocArr);
      }
    });
  };

  // function stopFetching() {
  //   unsubscribeParent();
  // }
  useEffect(() => {
    fetchDocument();
  }, []);
  return (
    <Container>
      <Header>
        <HeaderText>Dashboard</HeaderText>
        <AdminProfile onPress={() => navigation.navigate("ProfileAdmin")}>
          <AdminProfileTxt>A</AdminProfileTxt>
        </AdminProfile>
      </Header>
      <SectionContainer>
        <SectionTitle>Current Parents</SectionTitle>
      </SectionContainer>
      <FlatListUser
        data={parentsDoc}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => {
          return (
            <UserItem
              user={item.data()}
              navigation={navigation}
              parentId={item.id}
            />
          );
        }}
      />
    </Container>
  );
};

export default Dashboard;
