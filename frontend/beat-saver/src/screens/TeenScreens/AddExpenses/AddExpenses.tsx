import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Props } from "../../../navigation/props";
import {
  AddButtonText,
  BalanceAmount,
  BalanceCard,
  BalanceHeader,
  BalanceLabel,
  CancelButtonText,
  Container,
  Emoji,
  FormGroup,
  Greeting,
  Header2,
  IncomeExpenseItem,
  IncomeExpenseLabel,
  IncomeExpenseRow,
  Label,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  MoreIcon,
  ScrollContainer,
  SectionTitle,
  TransactionCategory,
  TransactionDate,
  TransactionDescription,
  TransactionDetails,
  TransactionLeft,
  TransactionRight,
  TransactionsSection,
} from "./AddExpensesStyles";
import { Username } from "../../AdminScreens/Dashboard/UserList/UserItemStyles";
import { onAuthStateChanged, User } from "@firebase/auth";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { AUTH, DB } from "../../../db/firebase";

const ExpenseTracker: React.FC<Props> = ({ navigation }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      category: "Dining",
      description: "ate pizza",
      amount: -810,
      date: "28 Dec",
      emoji: "🍕",
      color: "#8B5CF6",
    },
    {
      id: 2,
      type: "expense",
      category: "Others",
      description: "Gifted a mug",
      amount: -530,
      date: "27 Dec",
      emoji: "☕",
      color: "#6B7280",
    },
    {
      id: 3,
      type: "income",
      category: "Income",
      description: "Sold files",
      amount: 850,
      date: "27 Dec",
      emoji: "💰",
      color: "#10B981",
    },
    {
      id: 4,
      type: "income",
      category: "Income",
      description: "Got paid",
      amount: 820,
      date: "26 Dec",
      emoji: "💵",
      color: "#10B981",
    },
    {
      id: 5,
      type: "expense",
      category: "Entertainment",
      description: "Got a toy",
      amount: -250,
      date: "25 Dec",
      emoji: "🎁",
      color: "#A855F7",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [teens, setTeens] = useState<DocumentData>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    category: "",
    description: "",
    amount: "",
  });
  const db = DB;

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      setUser(user);
      fetchDocument();
    }
  });

  const fetchDocument = () => {
    if (user) {
      const teenUsersCollection = doc(db, "teens", user.uid);
      onSnapshot(teenUsersCollection, (teenSnapshot) => {
        if (teenSnapshot.exists()) {
          setTeens(teenSnapshot.data());
        }
      });
    }
  };

  const totalBalance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = Math.abs(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  );

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const handleDateChange = (event, date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAddTransaction = () => {
    if (
      newTransaction.category &&
      newTransaction.description &&
      newTransaction.amount
    ) {
      const amount =
        newTransaction.type === "expense"
          ? -Math.abs(parseFloat(newTransaction.amount))
          : Math.abs(parseFloat(newTransaction.amount));

      const emojis = {
        Dining: "🍕",
        Entertainment: "🎁",
        Shopping: "🛍️",
        Others: "📦",
        Income: "💰",
        Transport: "🚗",
        Health: "🏥",
      };

      const colors = {
        Dining: "#8B5CF6",
        Entertainment: "#A855F7",
        Shopping: "#7C3AED",
        Others: "#6B7280",
        Income: "#10B981",
        Transport: "#8B5CF6",
        Health: "#A855F7",
      };

      const newEntry = {
        id: Date.now(),
        type: newTransaction.type,
        category: newTransaction.category,
        description: newTransaction.description,
        amount: amount,
        date: formatDate(selectedDate),
        emoji: emojis[newTransaction.category] || "📦",
        color: colors[newTransaction.category] || "#6B7280",
      };

      setTransactions([newEntry, ...transactions]);
      setNewTransaction({
        type: "expense",
        category: "",
        description: "",
        amount: "",
      });
      setSelectedDate(new Date());
      setShowAddForm(false);
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const CategoryPicker = ({ value, onChange, type }) => {
    const expenseCategories = [
      "Dining",
      "Entertainment",
      "Shopping",
      "Transport",
      "Health",
      "Others",
    ];
    const incomeCategories = ["Income"];
    const categories =
      type === "expense" ? expenseCategories : incomeCategories;

    return (
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              value === category && styles.categoryButtonSelected,
            ]}
            onPress={() => onChange(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                value === category && styles.categoryButtonTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Container>
      <ScrollContainer>
        {/* Header */}
        <Header2>
          <View>
            <Greeting>Hello</Greeting>
            <Username>{teens ? teens.firstName : null}</Username>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate("ProfileTeen")}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </Header2>

        {/* Balance Card */}
        <BalanceCard>
          <BalanceHeader>
            <View>
              <BalanceLabel>Total Balance</BalanceLabel>
              <BalanceAmount>₱{totalBalance.toFixed(2)}</BalanceAmount>
            </View>
            <MoreIcon>⋯</MoreIcon>
          </BalanceHeader>

          <IncomeExpenseRow>
            <IncomeExpenseItem>
              <View
                style={[styles.indicator, { backgroundColor: "#10B981" }]}
              />
              <View>
                <IncomeExpenseLabel>Income</IncomeExpenseLabel>
                <Text
                  style={[styles.incomeExpenseAmount, { color: "#10B981" }]}
                >
                  ₱{totalIncome.toFixed(2)}
                </Text>
              </View>
            </IncomeExpenseItem>
            <IncomeExpenseLabel>
              <View
                style={[styles.indicator, { backgroundColor: "#EF4444" }]}
              />
              <View>
                <IncomeExpenseLabel>Expense</IncomeExpenseLabel>
                <Text
                  style={[styles.incomeExpenseAmount, { color: "#EF4444" }]}
                >
                  ₱{totalExpense.toFixed(2)}
                </Text>
              </View>
            </IncomeExpenseLabel>
          </IncomeExpenseRow>
        </BalanceCard>

        {/* Recent Transactions */}
        <TransactionsSection>
          <SectionTitle>Recent Transactions</SectionTitle>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <TransactionLeft>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: transaction.color },
                  ]}
                >
                  <Emoji>{transaction.emoji}</Emoji>
                </View>
                <TransactionDetails>
                  <TransactionCategory>
                    {transaction.category}
                  </TransactionCategory>
                  <TransactionDescription>
                    {transaction.description}
                  </TransactionDescription>
                </TransactionDetails>
              </TransactionLeft>
              <TransactionRight>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.amount > 0 ? "#10B981" : "#EF4444" },
                  ]}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount)}
                </Text>
                <TransactionDate>{transaction.date}</TransactionDate>
              </TransactionRight>
            </View>
          ))}
        </TransactionsSection>
      </ScrollContainer>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(true)}
      >
        <AddButtonText>+</AddButtonText>
      </TouchableOpacity>

      {/* Add Transaction Modal */}
      <Modal
        visible={showAddForm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddForm(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Add Transaction</ModalTitle>

            <FormGroup>
              <Label>Type</Label>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newTransaction.type === "expense" &&
                      styles.typeButtonSelected,
                  ]}
                  onPress={() =>
                    setNewTransaction({
                      ...newTransaction,
                      type: "expense",
                      category: "",
                    })
                  }
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      newTransaction.type === "expense" &&
                        styles.typeButtonTextSelected,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newTransaction.type === "income" &&
                      styles.typeButtonSelected,
                  ]}
                  onPress={() =>
                    setNewTransaction({
                      ...newTransaction,
                      type: "income",
                      category: "",
                    })
                  }
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      newTransaction.type === "income" &&
                        styles.typeButtonTextSelected,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <CategoryPicker
                value={newTransaction.category}
                onChange={(category) =>
                  setNewTransaction({ ...newTransaction, category })
                }
                type={newTransaction.type}
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextInput
                style={styles.input}
                value={newTransaction.description}
                onChangeText={(text) =>
                  setNewTransaction({ ...newTransaction, description: text })
                }
                placeholder="Enter description"
                placeholderTextColor="#9CA3AF"
              />
            </FormGroup>

            <FormGroup>
              <Label>Amount</Label>
              <TextInput
                style={styles.input}
                value={newTransaction.amount}
                onChangeText={(text) =>
                  setNewTransaction({ ...newTransaction, amount: text })
                }
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </FormGroup>

            <FormGroup>
              <Label>Date</Label>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
              </TouchableOpacity>
            </FormGroup>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddForm(false)}
              >
                <CancelButtonText>Cancel</CancelButtonText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTransactionButton}
                onPress={handleAddTransaction}
              >
                <AddButtonText>Add</AddButtonText>
              </TouchableOpacity>
            </View>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* iOS Date Picker Modal */}
      {Platform.OS === "ios" && showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.datePickerModalOverlay}>
            <View style={styles.datePickerModal}>
              <View style={styles.datePickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.datePickerCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.datePickerDone}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    fontSize: 16,
  },
  indicator: {
    width: 8,
    height: 24,
    borderRadius: 4,
    marginRight: 8,
  },
  incomeExpenseLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 2,
  },
  incomeExpenseAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  transactionsSection: {
    paddingHorizontal: 24,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: "#8B5CF6",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  typeSelector: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  typeButtonSelected: {
    backgroundColor: "#8B5CF6",
  },
  typeButtonText: {
    color: "#374151",
    fontWeight: "500",
  },
  typeButtonTextSelected: {
    color: "#FFFFFF",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  categoryButtonSelected: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#374151",
  },
  categoryButtonTextSelected: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#000000",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
  },
  addTransactionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#8B5CF6",
    borderRadius: 8,
    alignItems: "center",
  },
  datePickerModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  datePickerModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  datePickerCancel: {
    fontSize: 16,
    color: "#6B7280",
  },
  datePickerDone: {
    fontSize: 16,
    color: "#8B5CF6",
    fontWeight: "600",
  },
  datePicker: {
    height: 200,
  },
});

export default ExpenseTracker;
