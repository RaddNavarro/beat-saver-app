import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  EmitterSubscription,
} from "react-native";

import {
  ActionsRow,
  CategoryContainer,
  CategoryLabel,
  ClearAllButton,
  ClearAllButtonText,
  ClearAllToggle,
  Container,
  DescriptionContainer,
  DescriptionInput,
  DropdownButton,
  DropdownButtonText,
  DropdownIcon,
  DropdownItem,
  DropdownItemText,
  DropdownList,
  EmptyHistoryText,
  FlexSpacer,
  HistoryContainer,
  HistoryItem,
  HistoryItemCategory,
  HistoryItemDescription,
  HistoryItemLeft,
  HistoryList,
  HistoryTime,
  HistoryTitle,
  HistoryToggle,
  HistoryToggleText,
  HistoryValue,
  InputText,
  InputView,
  KeypadButton,
  KeypadButtonText,
  KeypadContainer,
  KeypadRow,
  ModalOverlay,
  TotalText,
  TotalView,
} from "./AddExpensesStyles";
import { HistoryItemProps, Props } from "../../../navigation/props";

const AddExpenses: React.FC<Props> = ({ navigation }) => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItemProps[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Food");
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [screenHeight, setScreenHeight] = useState<number>(
    Dimensions.get("window").height
  );

  // Update dimensions on screen rotation or size change
  useEffect(() => {
    const updateLayout = (): void => {
      setScreenHeight(Dimensions.get("window").height);
    };

    const dimensionsHandler: EmitterSubscription = Dimensions.addEventListener(
      "change",
      updateLayout
    );

    return () => {
      // Clean up the event listener
      dimensionsHandler?.remove();
    };
  }, []);

  // Predefined categories
  const categories: string[] = ["Food", "Transportation", "School", "Personal"];

  const handleNumber = (num: string): void => {
    setCurrentInput(currentInput + num);
  };

  const handleSubmit = (): void => {
    if (currentInput === "") return;

    const value: number = parseFloat(currentInput);
    if (!isNaN(value)) {
      // Add the current value to history with the selected category and description
      const newHistoryItem: HistoryItemProps = {
        value: value,
        category: selectedCategory,
        description: description,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Update the total and history
      setTotal((prevTotal: number) => prevTotal + value);
      setHistory((prevHistory: HistoryItemProps[]) => [
        ...prevHistory,
        newHistoryItem,
      ]);

      // Clear the current input and description
      setCurrentInput("");
      setDescription("");
    }
  };

  const handleDecimal = (): void => {
    if (!currentInput.includes(".")) {
      setCurrentInput(currentInput === "" ? "0." : currentInput + ".");
    }
  };

  const handleDelete = (): void => {
    if (currentInput.length > 0) {
      setCurrentInput(currentInput.slice(0, -1));
    }
  };

  const handleClear = (): void => {
    setCurrentInput("");
  };

  const handleClearAll = (): void => {
    setCurrentInput("");
    setDescription("");
    setTotal(0);
    setHistory([]);
  };

  const toggleHistory = (): void => {
    setShowHistory(!showHistory);
    setCurrentInput("");
    setDescription("");
  };

  const toggleCategoryDropdown = (): void => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const selectCategory = (category: string): void => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <Container>
        <TotalView>
          <TotalText>{formatCurrency(total)}</TotalText>
        </TotalView>

        <InputView>
          <InputText>
            {currentInput
              ? formatCurrency(parseFloat(currentInput) || 0)
              : "$0.00"}
          </InputText>
        </InputView>

        {/* Middle section */}
        <CategoryContainer>
          <CategoryLabel>Category:</CategoryLabel>
          <DropdownButton onPress={toggleCategoryDropdown}>
            <DropdownButtonText>{selectedCategory}</DropdownButtonText>
            <DropdownIcon>▼</DropdownIcon>
          </DropdownButton>

          <Modal
            transparent={true}
            visible={showCategoryDropdown}
            animationType="fade"
            onRequestClose={() => setShowCategoryDropdown(false)}
          >
            <TouchableWithoutFeedback
              onPress={() => setShowCategoryDropdown(false)}
            >
              <ModalOverlay>
                <DropdownList>
                  {categories.map((category: string) => (
                    <DropdownItem
                      key={category}
                      selected={selectedCategory === category}
                      onPress={() => selectCategory(category)}
                    >
                      <DropdownItemText
                        selected={selectedCategory === category}
                      >
                        {category}
                      </DropdownItemText>
                    </DropdownItem>
                  ))}
                </DropdownList>
              </ModalOverlay>
            </TouchableWithoutFeedback>
          </Modal>
        </CategoryContainer>

        <DescriptionContainer>
          <DescriptionInput
            placeholder="Enter description (optional)"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#adb5bd"
          />
        </DescriptionContainer>

        <ActionsRow>
          <HistoryToggle onPress={toggleHistory} activeOpacity={0.7}>
            <HistoryToggleText>
              {showHistory ? "Hide History" : "Show History"}
            </HistoryToggleText>
          </HistoryToggle>

          <ClearAllToggle>
            <ClearAllButton onPress={handleClearAll} activeOpacity={0.7}>
              <ClearAllButtonText>Clear All</ClearAllButtonText>
            </ClearAllButton>
          </ClearAllToggle>
        </ActionsRow>

        {/* History Section - Conditionally Rendered */}
        {showHistory && (
          <HistoryContainer>
            <HistoryTitle>History</HistoryTitle>
            {history.length > 0 ? (
              <HistoryList
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 5 }}
              >
                {history.map((item: HistoryItemProps, index: number) => (
                  <HistoryItem key={index}>
                    <HistoryItemLeft>
                      <HistoryTime>{item.timestamp}</HistoryTime>
                      <HistoryItemCategory>{item.category}</HistoryItemCategory>
                      {item.description ? (
                        <HistoryItemDescription>
                          {item.description}
                        </HistoryItemDescription>
                      ) : null}
                    </HistoryItemLeft>
                    <HistoryValue>{formatCurrency(item.value)}</HistoryValue>
                  </HistoryItem>
                ))}
              </HistoryList>
            ) : (
              <EmptyHistoryText>No entries yet</EmptyHistoryText>
            )}
          </HistoryContainer>
        )}

        {/* Flexible spacer to push keypad to bottom */}
        <FlexSpacer />

        {/* Number Pad - Now positioned at bottom */}
        <KeypadContainer>
          <KeypadRow>
            <KeypadButton onPress={() => handleNumber("7")}>
              <KeypadButtonText>7</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("8")}>
              <KeypadButtonText>8</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("9")}>
              <KeypadButtonText>9</KeypadButtonText>
            </KeypadButton>
          </KeypadRow>
          <KeypadRow>
            <KeypadButton onPress={() => handleNumber("4")}>
              <KeypadButtonText>4</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("5")}>
              <KeypadButtonText>5</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("6")}>
              <KeypadButtonText>6</KeypadButtonText>
            </KeypadButton>
          </KeypadRow>
          <KeypadRow>
            <KeypadButton onPress={() => handleNumber("1")}>
              <KeypadButtonText>1</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("2")}>
              <KeypadButtonText>2</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("3")}>
              <KeypadButtonText>3</KeypadButtonText>
            </KeypadButton>
          </KeypadRow>
          <KeypadRow>
            <KeypadButton onPress={handleDecimal}>
              <KeypadButtonText>.</KeypadButtonText>
            </KeypadButton>
            <KeypadButton onPress={() => handleNumber("0")}>
              <KeypadButtonText>0</KeypadButtonText>
            </KeypadButton>
            <KeypadButton isDelete={true} onPress={handleDelete}>
              <KeypadButtonText isDelete={true}>⌫</KeypadButtonText>
            </KeypadButton>
          </KeypadRow>
          <KeypadRow>
            <KeypadButton isClear={true} onPress={handleClear}>
              <KeypadButtonText>Clear</KeypadButtonText>
            </KeypadButton>
            <KeypadButton isAdd={true} onPress={handleSubmit}>
              <KeypadButtonText isAdd={true}>Add</KeypadButtonText>
            </KeypadButton>
          </KeypadRow>
        </KeypadContainer>
      </Container>
    </>
  );
};

export default AddExpenses;
