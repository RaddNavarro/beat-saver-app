import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Header2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  padding-top: 32px;
`;

export const HeaderLeft = styled.View``;

export const Greeting = styled.Text`
  color: #6b7280;
  font-size: 14px;
`;

export const UserName = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: #f3f4f6;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled.Text`
  font-size: 16px;
`;

export const BalanceCard = styled.View`
  background-color: #f8fafc;
  margin-horizontal: 24px;
  margin-bottom: 24px;
  border-radius: 12px;
  padding: 24px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const BalanceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const BalanceLeft = styled.View``;

export const BalanceLabel = styled.Text`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const BalanceAmount = styled.Text`
  color: #000000;
  font-size: 32px;
  font-weight: bold;
`;

export const MoreIcon = styled.Text`
  color: #9ca3af;
  font-size: 20px;
`;

export const IncomeExpenseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const IncomeExpenseItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface IndicatorProps {
  color: string;
}

export const Indicator = styled.View<IndicatorProps>`
  width: 8px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${props => props.color};
`;

export const IncomeExpenseDetails = styled.View``;

export const IncomeExpenseLabel = styled.Text`
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 2px;
`;

interface AmountTextProps {
  color: string;
}

export const IncomeExpenseAmount = styled.Text<AmountTextProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.color};
`;

export const TransactionsSection = styled.View`
  padding-horizontal: 24px;
`;

export const SectionTitle = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const TransactionItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TransactionLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

interface IconContainerProps {
  backgroundColor: string;
}

export const IconContainer = styled.View<IconContainerProps>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background-color: ${props => props.backgroundColor};
`;

export const Emoji = styled.Text`
  font-size: 20px;
`;

export const TransactionDetails = styled.View`
  flex: 1;
`;

export const TransactionCategory = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
`;

export const TransactionDescription = styled.Text`
  color: #9ca3af;
  font-size: 14px;
`;

export const TransactionRight = styled.View`
  align-items: flex-end;
`;

export const TransactionAmount = styled.Text<AmountTextProps>`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${props => props.color};
`;

export const TransactionDate = styled.Text`
  color: #9ca3af;
  font-size: 14px;
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: #8b5cf6;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

export const AddButtonText = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const ModalContent = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000000;
`;

export const FormGroup = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #000000;
`;

export const TypeSelector = styled.View`
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
  border-width: 1px;
  border-color: #d1d5db;
`;

interface TypeButtonProps {
  selected: boolean;
}

export const TypeButton = styled.TouchableOpacity<TypeButtonProps>`
  flex: 1;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  background-color: ${props => props.selected ? '#8b5cf6' : '#ffffff'};
  align-items: center;
`;

export const TypeButtonText = styled.Text<TypeButtonProps>`
  color: ${props => props.selected ? '#ffffff' : '#374151'};
  font-weight: 500;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

interface CategoryButtonProps {
  selected: boolean;
}

export const CategoryButton = styled.TouchableOpacity<CategoryButtonProps>`
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${props => props.selected ? '#8b5cf6' : '#d1d5db'};
  background-color: ${props => props.selected ? '#8b5cf6' : '#ffffff'};
`;

export const CategoryButtonText = styled.Text<CategoryButtonProps>`
  font-size: 14px;
  color: ${props => props.selected ? '#ffffff' : '#374151'};
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  font-size: 16px;
  color: #000000;
  background-color: #ffffff;
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 8px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
  align-items: center;
`;

export const CancelButtonText = styled.Text`
  color: #374151;
  font-weight: 500;
`;

export const AddTransactionButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  background-color: #8b5cf6;
  border-radius: 8px;
  align-items: center;
`;

export const AddTransactionButtonText = styled.Text`
  color: #ffffff;
  font-weight: 500;
`;