import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { AUTH, DB } from "../../../db/firebase";
import { Container, FlatListUser } from "./DashboardStyles";
import UserItem from "./UserList/UserItem";
import { Props } from "../../../navigation/props";

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const auth = AUTH;
  const db = DB;
  let unsubscribeParent = () => {};

  const [parents, setParents] = useState([]);

  const parentUsersCollection = collection(db, "parents");

  const fetchDocument = () => {
    unsubscribeParent = onSnapshot(parentUsersCollection, (parentSnapshot) => {
      let parentArr = [];
      if (!parentSnapshot.empty) {
        parentSnapshot.docs.forEach((parent) => {
          parentArr.push(parent.data());
        });
        setParents(parentArr);
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
      <FlatListUser
        data={parents}
        keyExtractor={(item) => item?.email}
        renderItem={({ item }) => {
          return <UserItem user={item} />;
        }}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("ProfileAdmin")}
      />
    </Container>
  );
};

export default Dashboard;
