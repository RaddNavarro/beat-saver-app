import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import {
  ExpenseIcon,
  ExpenseIconText,
  ExpenseItemContainer,
  ExpenseText,
  ExpenseTitle,
  ExpenseSubtitle,
  ExpenseAmount,
  Container,
  Header,
  HeaderText,
  ProfilePic,
  AllowanceCard,
  AllowanceAmount,
  AddMoneyTxt,
  SectionHeader,
  SectionTitle,
  ViewAll,
  Scroll,
  DayLabel,
  Fab,
  FabTxt,
  ModalOverlay,
  ModalContent,
  ModalBtn,
  EnterAmountTxt,
  Input,
  CancelBtn,
  CancelTxt,
  ConfirmBtn,
  ConfirmTxt,
  AddMoneyContainer,
} from "./HomeStylesTeens";
import { ExpenseItemProps, Props } from "../../../navigation/props";

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  icon,
  title,
  subtitle,
  amount,
}) => (
  <ExpenseItemContainer>
    <ExpenseIcon>
      <ExpenseIconText>{icon}</ExpenseIconText>
    </ExpenseIcon>
    <ExpenseText>
      <ExpenseTitle>{title}</ExpenseTitle>
      <ExpenseSubtitle>{subtitle}</ExpenseSubtitle>
    </ExpenseText>
    <ExpenseAmount>{amount}</ExpenseAmount>
  </ExpenseItemContainer>
);

const Home: React.FC<Props> = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputAmount, setInputAmount] = useState("");

  const handleConfirmAdd = () => {
    const amount = parseFloat(inputAmount);
    if (!isNaN(amount) && amount > 0) {
      setBalance((prev) => prev + amount);
    }
    setInputAmount("");
    setModalVisible(false);
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderText>BeatSaver</HeaderText>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileTeen")}>
          <ProfilePic
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXZ8ORCFOkes_5zSVPN14Pj_AvxZuguzoizQ&s",
            }} // Replace with real image
          />
        </TouchableOpacity>
      </Header>

      {/* Allowance */}
      <AllowanceCard>
        <AllowanceAmount>
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(balance)}
        </AllowanceAmount>
        <AddMoneyContainer>
          <AddMoneyTxt>Current Allowance</AddMoneyTxt>
        </AddMoneyContainer>
      </AllowanceCard>

      {/* All Expenses Section */}
      <SectionHeader>
        <SectionTitle>All Expenses</SectionTitle>
        <TouchableOpacity>
          <ViewAll>View All</ViewAll>
        </TouchableOpacity>
      </SectionHeader>

      {/* Expenses List */}
      <Scroll showsVerticalScrollIndicator={false}>
        <ExpenseItem
          icon="☕"
          title="Coffee"
          subtitle="with Peter Brawar"
          amount="₱68"
        />
        <ExpenseItem
          icon="📩"
          title="Subscription"
          subtitle="made with Chipspwan"
          amount="₱149"
        />
      </Scroll>

      {/* Floating Action Button */}
      <Fab onPress={() => setModalVisible(true)}>
        <FabTxt>+</FabTxt>
      </Fab>

      {/* Add Money Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalOverlay>
          <ModalContent>
            <EnterAmountTxt>Enter Amount</EnterAmountTxt>
            <Input
              keyboardType="numeric"
              placeholder="e.g. 500"
              value={inputAmount}
              onChangeText={setInputAmount}
            />
            <ModalBtn>
              <CancelBtn onPress={() => setModalVisible(false)}>
                <CancelTxt>Cancel</CancelTxt>
              </CancelBtn>
              <ConfirmBtn onPress={handleConfirmAdd}>
                <ConfirmTxt>Confirm</ConfirmTxt>
              </ConfirmBtn>
            </ModalBtn>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};
export default Home;
