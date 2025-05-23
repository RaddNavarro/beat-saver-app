import styled from "styled-components/native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";

export const ExpenseItemContainer = styled(View)`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  elevation: 2;
`;

export const ExpenseIcon = styled(View)`
  width: 40px;
  height: 40px;
  background-color: #a020f0;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const ExpenseIconText = styled(Text)`
  font-size: 18px;
`;

export const ExpenseText = styled(View)`
  flex: 1;
`;

export const ExpenseTitle = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

export const ExpenseSubtitle = styled(Text)`
  font-size: 12px;
  color: #666666;
`;

export const ExpenseAmount = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const Container = styled(SafeAreaView)`
  flex: 1px;
  background-color: #f9f9f9;
  padding-horizontal: 20px;
`;

export const Header = styled(View)`
  margin-top: 10px;
  padding-top: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled(Text)`
  font-size: 22px;
  font-weight: bold;
`;

export const ProfilePic = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const AllowanceCard = styled(View)`
  background-color: #1c1c1e;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  align-items: center;
`;

export const AllowanceAmount = styled(Text)`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
`;

export const AddMoneyContainer = styled(View)`
  margin-top: 12px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 20px;
  background-color: #ffffff;
  align-items: center;
`;

export const AddMoneyTxt = styled(Text)`
  color: #1c1c1e;
  font-weight: 600;
`;

export const SectionHeader = styled(View)`
  margin-top: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const ViewAll = styled(Text)`
  font-size: 14px;
  color: #888888;
`;

export const Scroll = styled(ScrollView)`
  margin-top: 10px;
  margin-bottom: 60px;
`;

export const DayLabel = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: #444444;
  margin-top: 20px;
  margin-bottom: 8px;
`;

export const Fab = styled(TouchableOpacity)`
  position: absolute;
  right: 40px;
  bottom: 70px;
  width: 55px;
  height: 55px;
  background-color: #000000;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const FabTxt = styled(Text)`
  font-size: 30px;
  color: #ffffff;
`;

export const ModalOverlay = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled(View)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

export const EnterAmountTxt = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const Input = styled(TextInput)`
  width: 100%;
  border-color: #cccccc;
  border-width: 1px;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const ModalBtn = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const CancelBtn = styled(Pressable)`
  padding: 10px;
  border-radius: 8px;
  background-color: #eeeeee;
  flex: 1;
  margin-right: 5px;
  align-items: center;
`;

export const CancelTxt = styled(Text)`
  color: #888888;
`;

export const ConfirmBtn = styled(Pressable)`
  padding: 10px;
  border-radius: 8px;
  background-color: #000000;
  flex: 1;
  margin-left: 5px;
  align-items: center;
`;

export const ConfirmTxt = styled(Text)`
  color: #ffffff;
`;
