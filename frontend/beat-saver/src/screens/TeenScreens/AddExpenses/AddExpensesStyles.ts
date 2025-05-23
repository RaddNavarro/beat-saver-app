import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";
import {
  DropdownItemProps,
  DropdownItemTextProps,
  FlexSpacerProps,
  KeypadButtonProps,
  KeypadButtonTextProps,
} from "../../../navigation/props";

/* Add status bar height for iOS and Android */
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 50 : StatusBar.currentHeight;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f9fa;
  justify-content: space-between; /* Always use space-between to position keypad at bottom */
  padding-top: ${STATUS_BAR_HEIGHT}px; /* Add padding to account for status bar */
`;

/* Total Display */
export const TotalView = styled.View`
  padding: 12px;
  background-color: #212529;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: 8px;
  height: 70px;
`;

export const TotalText = styled.Text`
  color: white;
  font-size: 34px;
  font-weight: 600;
`;

/* Input Display */
export const InputView = styled.View`
  padding: 8px;
  background-color: #343a40;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: 8px;
  height: 45px;
`;

export const InputText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 400;
`;

/* Category Section */
export const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 10px;
  margin-bottom: 10px;
`;

export const CategoryLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
  color: #212529;
`;

export const DropdownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding-horizontal: 15px;
  padding-vertical: 8px;
  border-width: 1px;
  border-color: #ced4da;
  flex: 1;
`;

export const DropdownButtonText = styled.Text`
  font-size: 16px;
  color: #212529;
`;

export const DropdownIcon = styled.Text`
  font-size: 12px;
  color: #6c757d;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const DropdownList = styled.View`
  position: absolute;
  left: 10px;
  right: 10px;
  top: 190px;
  background-color: white;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ced4da;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  z-index: 1000;
`;

export const DropdownItem = styled.TouchableOpacity<DropdownItemProps>`
  padding-vertical: 12px;
  padding-horizontal: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
  background-color: ${(props) =>
    props.selected ? "rgba(138, 43, 226, 0.1)" : "white"};
`;

export const DropdownItemText = styled.Text<DropdownItemTextProps>`
  font-size: 16px;
  color: ${(props) => (props.selected ? "#8a2be2" : "#212529")};
  font-weight: ${(props) => (props.selected ? "500" : "normal")};
`;

/* Description Section */
export const DescriptionContainer = styled.View`
  margin-horizontal: 10px;
  margin-bottom: 10px;
`;

export const DescriptionInput = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-width: 1px;
  border-color: #ced4da;
  font-size: 16px;
  color: #212529;
`;

/* Actions Row */
export const ActionsRow = styled.View`
  flex-direction: row;
  margin-horizontal: 10px;
  margin-bottom: 10px;
`;

export const HistoryToggle = styled.TouchableOpacity`
  background-color: #8a2be2;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  flex: 1;
  margin-right: 5px;
`;

export const HistoryToggleText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

export const ClearAllToggle = styled.View`
  flex: 1;
`;

export const ClearAllButton = styled.TouchableOpacity`
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  flex: 1;
`;

export const ClearAllButtonText = styled.Text`
  color: #dc3545;
  font-weight: 500;
  font-size: 14px;
`;

/* History Section */
export const HistoryContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  margin: 10px;
  padding: 10px;
  max-height: 150px;
`;

export const HistoryTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #212529;
`;

export const HistoryList = styled.ScrollView`
  flex-grow: 0;
  flex-shrink: 1;
`;

export const HistoryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-vertical: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const HistoryItemLeft = styled.View`
  flex: 1;
  margin-right: 5px;
`;

export const HistoryTime = styled.Text`
  color: #6c757d;
  font-size: 11px;
`;

export const HistoryItemCategory = styled.Text`
  color: #343a40;
  font-size: 13px;
  font-weight: 400;
`;

export const HistoryItemDescription = styled.Text`
  color: #6c757d;
  font-size: 11px;
  font-style: italic;
  margin-top: 1px;
`;

export const HistoryValue = styled.Text`
  color: #212529;
  font-size: 13px;
  font-weight: 500;
`;

export const EmptyHistoryText = styled.Text`
  color: #6c757d;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;

/* Flex spacer to push keypad to bottom when needed */
export const FlexSpacer = styled.View<FlexSpacerProps>`
  flex: ${(props) => props.size || 1};
`;

/* Keypad */
export const KeypadContainer = styled.View`
  padding: 4px;
  margin-bottom: ${Platform.OS === "ios"
    ? 20
    : 45}px; /* Add bottom margin to avoid edge */
`;

export const KeypadRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const KeypadButton = styled.TouchableOpacity<KeypadButtonProps>`
  background-color: ${(props) =>
    props.isAdd
      ? "#8a2be2"
      : props.isClear || props.isDelete
      ? "#e9ecef"
      : "white"};
  flex: 1;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin: 3px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const KeypadButtonText = styled.Text<KeypadButtonTextProps>`
  font-size: ${(props) => (props.isAdd ? "17px" : "20px")};
  font-weight: ${(props) => (props.isAdd ? "600" : "500")};
  color: ${(props) =>
    props.isAdd ? "white" : props.isDelete ? "#dc3545" : "#212529"};
`;
